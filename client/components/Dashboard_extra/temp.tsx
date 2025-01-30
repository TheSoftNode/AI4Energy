const CompetitorMap: React.FC<CompetitorMapProps> = ({
    clientStations,
    competitors,
    radius = 10
}) => {
    const { marketData, metrics } = useDashboard();
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [priceFilter, setPriceFilter] = useState<'all' | 'below' | 'above'>('all');
    const [mapView, setMapView] = useState<'standard' | 'heatmap' | 'cluster'>('standard');
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
    const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorAnalysis | null>(null);

    // Function to create enhanced tooltip content
    const createClientTooltipContent = (client: ClientStation) => {
        return `
            <div class="client-tooltip">
                <div class="client-tooltip-header">
                    <h3 class="text-lg font-semibold text-gray-900">${client.name}</h3>
                    ${client.address ? `<p class="text-sm text-gray-500 mt-1">${client.address}</p>` : ''}
                </div>
                <div class="client-tooltip-content">
                    <div class="mb-3">
                        <h4 class="text-sm font-medium text-gray-700 mb-2">Recommended Prices</h4>
                        ${client.recommendations.map(rec => `
                            <div class="fuel-price-row">
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-medium">${rec.fuelType}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-sm text-gray-600">€${rec.currentPrice.toFixed(3)}</span>
                                    <svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    <span class="text-sm font-medium text-green-700">€${rec.recommendedPrice.toFixed(3)}</span>
                                    <span class="px-1.5 py-0.5 text-xs rounded bg-green-50 text-green-700">${rec.confidence}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${client.operatingHours ? `
                        <div class="pt-2 border-t border-gray-100">
                            <p class="text-xs text-gray-500">Operating Hours: ${client.operatingHours}</p>
                        </div>
                    ` : ''}
                    ${client.lastUpdated ? `
                        <div class="text-xs text-gray-400 mt-2">
                            Last updated: ${new Date(client.lastUpdated).toLocaleString()}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    };

    // Initialize map
    useEffect(() => {
        // Add custom styles to document
        const styleSheet = document.createElement("style");
        styleSheet.textContent = tooltipStyles;
        document.head.appendChild(styleSheet);

        const initMap = () => {
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                // Calculate center point from all client stations
                const centerLat = clientStations.reduce((sum, station) => sum + station.latitude, 0) / clientStations.length;
                const centerLng = clientStations.reduce((sum, station) => sum + station.longitude, 0) / clientStations.length;

                const newMap = new mapboxgl.Map({
                    container: mapContainer,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [centerLng, centerLat],
                    zoom: 12
                });
                setMap(newMap);
            }
        };
        initMap();

        return () => {
            styleSheet.remove();
        };
    }, [clientStations]);

    // Handle markers and interactions
    useEffect(() => {
        if (!map) return;

        // Clear existing markers
        const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
        existingMarkers.forEach(marker => marker.remove());

        const bounds = new mapboxgl.LngLatBounds();

        // Add client station markers
        clientStations.forEach(client => {
            const el = document.createElement('div');
            el.className = 'cursor-pointer client-marker';
            el.innerHTML = `
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
                    ${client.name.charAt(0)}
                </div>
            `;

            // Create tooltip
            const tooltip = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                offset: [0, -10],
                className: 'client-station-tooltip'
            });

            // Add marker
            new mapboxgl.Marker(el)
                .setLngLat([client.longitude, client.latitude])
                .addTo(map);

            // Add hover events
            el.addEventListener('mouseenter', () => {
                tooltip
                    .setLngLat([client.longitude, client.latitude])
                    .setHTML(createClientTooltipContent(client))
                    .addTo(map);
            });

            el.addEventListener('mouseleave', () => {
                tooltip.remove();
            });

            // Add click event
            el.addEventListener('click', () => {
                window.open(`/price-console?client=${client.id}`, '_blank');
            });

            bounds.extend([client.longitude, client.latitude]);
        });

        // Add competitor markers
        competitors.forEach((competitor) => {
            // Only show competitors within radius of any client station
            const isInRange = clientStations.some(client => {
                const R = 6371; // Earth's radius in km
                const dLat = (competitor.latitude - client.latitude) * Math.PI / 180;
                const dLon = (competitor.longitude - client.longitude) * Math.PI / 180;
                const a = 
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(client.latitude * Math.PI / 180) * Math.cos(competitor.latitude * Math.PI / 180) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const distance = R * c;
                return distance <= radius;
            });

            if (isInRange) {
                const el = document.createElement('div');
                el.className = 'cursor-pointer competitor-marker';
                el.innerHTML = `
                    <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
                        S
                    </div>
                `;

                new mapboxgl.Marker(el)
                    .setLngLat([competitor.longitude, competitor.latitude])
                    .addTo(map);

                el.addEventListener('click', () => {
                    handleCompetitorClick(competitor);
                });

                bounds.extend([competitor.longitude, competitor.latitude]);
            }
        });

        // Fit map to bounds
        map.fitBounds(bounds, { padding: 50 });
    }, [map, competitors, clientStations, radius]);

    // ... rest of your existing component code (handleCompetitorClick, filters, etc.) ...

    return (
        <Card className="col-span-2">
            {/* ... existing JSX ... */}
        </Card>
    );
};

export default CompetitorMap;