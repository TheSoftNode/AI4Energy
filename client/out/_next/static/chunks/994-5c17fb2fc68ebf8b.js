"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[994],{57994:function(e,s,a){a.d(s,{default:function(){return _}});var t=a(57437),r=a(2265),i=a(66070),n=a(34933),l=a(21156),c=a(56940),d=a(97059),o=a(62994),m=a(62335),x=a(54061),u=a(5481),h=a(23263),p=a(16488),f=a(6987),j=a(13446),g=a(99904),v=a(62869),y=a(53647),N=a(35974),b=a(76865),w=a(70525),C=a(3085),k=a(31047),M=a(92735),D=a(90740),P=a(82431),I=a(11239),S=a(76858),z=a(20271),R=a(94508);let Z=z.fC,A=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)(z.aV,{ref:s,className:(0,R.cn)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",a),...r})});A.displayName=z.aV.displayName;let K=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)(z.xz,{ref:s,className:(0,R.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",a),...r})});K.displayName=z.xz.displayName;let V=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)(z.VY,{ref:s,className:(0,R.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",a),...r})});V.displayName=z.VY.displayName;var O=a(46632),_=()=>{let{metrics:e,marketData:s}=(0,O.Q)(),[a,z]=(0,r.useState)("7d"),[R,_]=(0,r.useState)(null),Y=(()=>{let a=[],t=new Date;for(let r=30;r>=0;r--){let i=new Date(t);i.setDate(i.getDate()-r),a.push({date:i.toISOString().split("T")[0],ourPrice:e.currentPrice+(Math.random()-.5)*.1,avgPrice:s.competitorAvgPrice+(Math.random()-.5)*.1,volume:e.volumeSold*(1+(Math.random()-.5)*.2),margin:e.grossMargin*(1+(Math.random()-.5)*.15)})}return a})(),B=e=>(0,t.jsx)(i.Zb,{className:"hover:shadow-md transition-all cursor-pointer",onClick:()=>_(e.title),children:(0,t.jsx)(i.aY,{className:"pt-6",children:(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:e.title}),e.anomaly&&(0,t.jsx)(b.Z,{className:"h-4 w-4 text-yellow-500"})]}),(0,t.jsxs)("div",{className:"flex items-end justify-between",children:[(0,t.jsxs)("span",{className:"text-2xl font-bold",children:[e.value,"%"]}),(0,t.jsxs)("div",{className:"flex items-center ".concat("up"===e.trend?"text-green-500":"down"===e.trend?"text-red-500":"text-gray-500"),children:["up"===e.trend?(0,t.jsx)(w.Z,{className:"h-4 w-4 mr-1"}):(0,t.jsx)(C.Z,{className:"h-4 w-4 mr-1"}),(0,t.jsxs)("span",{className:"text-sm",children:[Math.abs(e.change),"%"]})]})]}),e.forecast&&(0,t.jsxs)("div",{className:"text-sm text-gray-500",children:["Forecast: ",e.forecast,"%"]})]})})});return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold",children:"Analytics & Insights"}),(0,t.jsx)("p",{className:"text-sm text-gray-500",children:"Comprehensive analysis of pricing performance and market dynamics"})]}),(0,t.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,t.jsxs)(y.Ph,{value:a,onValueChange:z,children:[(0,t.jsx)(y.i4,{className:"w-[150px]",children:(0,t.jsx)(y.ki,{})}),(0,t.jsxs)(y.Bw,{children:[(0,t.jsx)(y.Ql,{value:"24h",children:"Last 24 Hours"}),(0,t.jsx)(y.Ql,{value:"7d",children:"Last 7 Days"}),(0,t.jsx)(y.Ql,{value:"30d",children:"Last 30 Days"}),(0,t.jsx)(y.Ql,{value:"90d",children:"Last Quarter"})]})]}),(0,t.jsxs)(v.z,{variant:"outline",size:"sm",children:[(0,t.jsx)(k.Z,{className:"h-4 w-4 mr-2"}),"Custom Range"]}),(0,t.jsxs)(v.z,{variant:"outline",size:"sm",children:[(0,t.jsx)(M.Z,{className:"h-4 w-4 mr-2"}),"Export"]})]})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[{title:"Revenue Optimization",value:94.5,change:3.2,trend:"up",forecast:96.8},{title:"Market Share",value:28.5,change:-1.5,trend:"down",anomaly:!0},{title:"Price Competitiveness",value:87.3,change:2.1,trend:"up",forecast:89.5},{title:"Customer Retention",value:92.1,change:.8,trend:"up"}].map(e=>B(e))}),(0,t.jsxs)(i.Zb,{children:[(0,t.jsx)(i.Ol,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(i.ll,{children:"Market Performance Trends"}),(0,t.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,t.jsx)(N.C,{variant:"outline",className:"bg-blue-50",children:"AI Analysis"}),(0,t.jsxs)(v.z,{variant:"outline",size:"sm",children:[(0,t.jsx)(D.Z,{className:"h-4 w-4 mr-2"}),"Filters"]}),(0,t.jsx)(v.z,{variant:"outline",size:"sm",children:(0,t.jsx)(P.Z,{className:"h-4 w-4"})})]})]})}),(0,t.jsx)(i.aY,{children:(0,t.jsxs)(Z,{defaultValue:"price",children:[(0,t.jsxs)(A,{children:[(0,t.jsx)(K,{value:"price",children:"Price Trends"}),(0,t.jsx)(K,{value:"volume",children:"Volume Analysis"}),(0,t.jsx)(K,{value:"margin",children:"Margin Performance"}),(0,t.jsx)(K,{value:"correlation",children:"Correlations"})]}),(0,t.jsxs)(V,{value:"price",className:"space-y-4",children:[(0,t.jsx)("div",{className:"h-[400px]",children:(0,t.jsx)(n.h,{width:"100%",height:"100%",children:(0,t.jsxs)(l.w,{data:Y,children:[(0,t.jsx)(c.q,{strokeDasharray:"3 3"}),(0,t.jsx)(d.K,{dataKey:"date"}),(0,t.jsx)(o.B,{}),(0,t.jsx)(m.u,{}),(0,t.jsx)(x.x,{type:"monotone",dataKey:"ourPrice",stroke:"#2563eb",name:"Our Price",strokeWidth:2}),(0,t.jsx)(x.x,{type:"monotone",dataKey:"avgPrice",stroke:"#16a34a",name:"Market Average",strokeWidth:2})]})})}),(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,t.jsx)(i.Zb,{children:(0,t.jsx)(i.aY,{className:"pt-6",children:(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-sm font-medium",children:"Price Position"}),(0,t.jsx)(N.C,{variant:"outline",className:"bg-green-50",children:"Optimal"})]}),(0,t.jsx)("div",{className:"text-2xl font-bold",children:"+2.3%"}),(0,t.jsx)("p",{className:"text-sm text-gray-500",children:"Above market average"})]})})}),(0,t.jsx)(i.Zb,{children:(0,t.jsx)(i.aY,{className:"pt-6",children:(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-sm font-medium",children:"Price Volatility"}),(0,t.jsx)(N.C,{variant:"outline",className:"bg-blue-50",children:"Low"})]}),(0,t.jsx)("div",{className:"text-2xl font-bold",children:"0.15"}),(0,t.jsx)("p",{className:"text-sm text-gray-500",children:"Standard deviation"})]})})}),(0,t.jsx)(i.Zb,{children:(0,t.jsx)(i.aY,{className:"pt-6",children:(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-sm font-medium",children:"Price Elasticity"}),(0,t.jsx)(N.C,{variant:"outline",className:"bg-yellow-50",children:"Moderate"})]}),(0,t.jsx)("div",{className:"text-2xl font-bold",children:"-1.2"}),(0,t.jsx)("p",{className:"text-sm text-gray-500",children:"Demand sensitivity"})]})})})]})]}),(0,t.jsx)(V,{value:"volume",children:(0,t.jsx)("div",{className:"h-[400px]",children:(0,t.jsx)(n.h,{width:"100%",height:"100%",children:(0,t.jsxs)(u.T,{data:Y,children:[(0,t.jsx)(c.q,{strokeDasharray:"3 3"}),(0,t.jsx)(d.K,{dataKey:"date"}),(0,t.jsx)(o.B,{}),(0,t.jsx)(m.u,{}),(0,t.jsx)(h.u,{type:"monotone",dataKey:"volume",stroke:"#2563eb",fill:"#93c5fd",name:"Sales Volume"})]})})})}),(0,t.jsx)(V,{value:"margin",children:(0,t.jsx)("div",{className:"h-[400px]",children:(0,t.jsx)(n.h,{width:"100%",height:"100%",children:(0,t.jsxs)(p.c,{data:Y,children:[(0,t.jsx)(c.q,{strokeDasharray:"3 3"}),(0,t.jsx)(d.K,{dataKey:"date"}),(0,t.jsx)(o.B,{yAxisId:"left"}),(0,t.jsx)(o.B,{yAxisId:"right",orientation:"right"}),(0,t.jsx)(m.u,{}),(0,t.jsx)(f.$,{yAxisId:"left",dataKey:"margin",fill:"#2563eb",name:"Gross Margin"}),(0,t.jsx)(x.x,{yAxisId:"right",type:"monotone",dataKey:"volume",stroke:"#16a34a",name:"Volume"})]})})})}),(0,t.jsx)(V,{value:"correlation"})]})})]}),(0,t.jsxs)(i.Zb,{children:[(0,t.jsx)(i.Ol,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)(i.ll,{className:"flex items-center space-x-2",children:[(0,t.jsx)(I.Z,{className:"h-5 w-5"}),(0,t.jsx)("span",{children:"AI Insights"})]}),(0,t.jsx)(N.C,{variant:"outline",className:"bg-purple-50",children:"Updated 5m ago"})]})}),(0,t.jsx)(i.aY,{children:(0,t.jsx)("div",{className:"space-y-4",children:[{title:"Price Optimization Opportunity",description:"Current price point shows potential for 3% increase without significant volume impact",impact:"High",confidence:92,action:"Review Pricing Strategy"},{title:"Competitive Pressure",description:"3 competitors showing consistent price reductions over the past 48 hours",impact:"Medium",confidence:85,action:"Monitor Competition"},{title:"Demand Pattern Shift",description:"Unusual increase in off-peak demand detected",impact:"Low",confidence:78,action:"Analyze Pattern"}].map((e,s)=>(0,t.jsxs)("div",{className:"flex items-start space-x-4 p-4 bg-gray-50 rounded-lg",children:[(0,t.jsx)("div",{className:"mt-1 h-3 w-3 rounded-full ".concat("High"===e.impact?"bg-blue-500":"Medium"===e.impact?"bg-yellow-500":"bg-gray-500")}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"font-medium",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-600 mt-1",children:e.description})]}),(0,t.jsxs)(N.C,{variant:"outline",className:e.confidence>=90?"bg-green-50":e.confidence>=80?"bg-blue-50":"bg-gray-50",children:[e.confidence,"% confidence"]})]}),(0,t.jsxs)("div",{className:"mt-2 flex items-center justify-between",children:[(0,t.jsxs)(N.C,{variant:"outline",className:"High"===e.impact?"bg-blue-50":"Medium"===e.impact?"bg-yellow-50":"bg-gray-50",children:[e.impact," Impact"]}),(0,t.jsxs)(v.z,{variant:"outline",size:"sm",children:[e.action,(0,t.jsx)(S.Z,{className:"h-4 w-4 ml-2"})]})]})]})]},s))})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,t.jsxs)(i.Zb,{children:[(0,t.jsx)(i.Ol,{children:(0,t.jsx)(i.ll,{children:"Price Elasticity Analysis"})}),(0,t.jsx)(i.aY,{children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("div",{className:"h-[300px]",children:(0,t.jsx)(n.h,{width:"100%",height:"100%",children:(0,t.jsxs)(j.G,{children:[(0,t.jsx)(c.q,{strokeDasharray:"3 3"}),(0,t.jsx)(d.K,{type:"number",dataKey:"priceChange",name:"Price Change %"}),(0,t.jsx)(o.B,{type:"number",dataKey:"volumeChange",name:"Volume Change %"}),(0,t.jsx)(m.u,{cursor:{strokeDasharray:"3 3"}}),(0,t.jsx)(g.b,{name:"Price-Volume Relationship",data:Array.from({length:50},()=>({priceChange:(Math.random()-.5)*10,volumeChange:(Math.random()-.5)*15})),fill:"#2563eb"})]})})}),(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Elasticity Coefficient"}),(0,t.jsx)("p",{className:"font-medium",children:"-1.32"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"R\xb2 Value"}),(0,t.jsx)("p",{className:"font-medium",children:"0.87"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Confidence Level"}),(0,t.jsx)("p",{className:"font-medium",children:"95%"})]})]})]})})]}),(0,t.jsxs)(i.Zb,{children:[(0,t.jsx)(i.Ol,{children:(0,t.jsx)(i.ll,{children:"Market Share Dynamics"})}),(0,t.jsx)(i.aY,{children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("div",{className:"h-[300px]",children:(0,t.jsx)(n.h,{width:"100%",height:"100%",children:(0,t.jsxs)(u.T,{data:Array.from({length:30},(e,s)=>({date:new Date(Date.now()-(29-s)*864e5).toISOString().split("T")[0],ourShare:25+5*Math.random(),competitor1:20+5*Math.random(),competitor2:15+5*Math.random(),competitor3:10+5*Math.random()})),children:[(0,t.jsx)(c.q,{strokeDasharray:"3 3"}),(0,t.jsx)(d.K,{dataKey:"date"}),(0,t.jsx)(o.B,{}),(0,t.jsx)(m.u,{}),(0,t.jsx)(h.u,{type:"monotone",dataKey:"ourShare",stackId:"1",stroke:"#2563eb",fill:"#93c5fd"}),(0,t.jsx)(h.u,{type:"monotone",dataKey:"competitor1",stackId:"1",stroke:"#16a34a",fill:"#86efac"}),(0,t.jsx)(h.u,{type:"monotone",dataKey:"competitor2",stackId:"1",stroke:"#ca8a04",fill:"#fde047"}),(0,t.jsx)(h.u,{type:"monotone",dataKey:"competitor3",stackId:"1",stroke:"#dc2626",fill:"#fca5a5"})]})})}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-blue-500 mr-2"}),(0,t.jsx)("span",{className:"text-sm",children:"Our Station"})]}),(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-green-500 mr-2"}),(0,t.jsx)("span",{className:"text-sm",children:"Competitor 1"})]}),(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-yellow-500 mr-2"}),(0,t.jsx)("span",{className:"text-sm",children:"Competitor 2"})]}),(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-red-500 mr-2"}),(0,t.jsx)("span",{className:"text-sm",children:"Competitor 3"})]})]}),(0,t.jsxs)(v.z,{variant:"outline",size:"sm",children:[(0,t.jsx)(D.Z,{className:"h-4 w-4 mr-2"}),"Filter"]})]})]})})]}),(0,t.jsxs)(i.Zb,{children:[(0,t.jsx)(i.Ol,{children:(0,t.jsx)(i.ll,{children:"Demand Forecast Models"})}),(0,t.jsx)(i.aY,{children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)(Z,{defaultValue:"hourly",children:[(0,t.jsxs)(A,{children:[(0,t.jsx)(K,{value:"hourly",children:"Hourly"}),(0,t.jsx)(K,{value:"daily",children:"Daily"}),(0,t.jsx)(K,{value:"weekly",children:"Weekly"})]}),(0,t.jsx)("div",{className:"h-[300px] mt-4",children:(0,t.jsx)(n.h,{width:"100%",height:"100%",children:(0,t.jsxs)(l.w,{data:Array.from({length:24},(e,s)=>({time:"".concat(s,":00"),actual:1e3*Math.random()+500,forecast:1e3*Math.random()+500,confidence:[900*Math.random()+400,1100*Math.random()+600]})),children:[(0,t.jsx)(c.q,{strokeDasharray:"3 3"}),(0,t.jsx)(d.K,{dataKey:"time"}),(0,t.jsx)(o.B,{}),(0,t.jsx)(m.u,{}),(0,t.jsx)(x.x,{type:"monotone",dataKey:"actual",stroke:"#2563eb",name:"Actual"}),(0,t.jsx)(x.x,{type:"monotone",dataKey:"forecast",stroke:"#16a34a",name:"Forecast",strokeDasharray:"5 5"}),(0,t.jsx)(h.u,{dataKey:"confidence",stroke:"none",fill:"#93c5fd",fillOpacity:.2,name:"Confidence Interval"})]})})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Forecast Accuracy"}),(0,t.jsx)("p",{className:"font-medium",children:"93.5%"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"MAPE"}),(0,t.jsx)("p",{className:"font-medium",children:"6.5%"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Next Update"}),(0,t.jsx)("p",{className:"font-medium",children:"15 mins"})]})]})]})})]}),(0,t.jsxs)(i.Zb,{children:[(0,t.jsx)(i.Ol,{children:(0,t.jsx)(i.ll,{children:"Price Optimization Scenarios"})}),(0,t.jsx)(i.aY,{children:(0,t.jsx)("div",{className:"space-y-4",children:[{name:"Maximize Revenue",priceChange:"+2.5%",volumeImpact:"-1.2%",revenueImpact:"+1.3%",confidence:92},{name:"Maintain Market Share",priceChange:"-1.0%",volumeImpact:"+1.8%",revenueImpact:"+0.8%",confidence:88},{name:"Balance Growth",priceChange:"+1.2%",volumeImpact:"-0.5%",revenueImpact:"+0.7%",confidence:90}].map((e,s)=>(0,t.jsxs)("div",{className:"p-4 bg-gray-50 rounded-lg",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h4",{className:"font-medium",children:e.name}),(0,t.jsxs)(N.C,{variant:"outline",className:"bg-blue-50",children:[e.confidence,"% confidence"]})]}),(0,t.jsxs)("div",{className:"mt-2 grid grid-cols-3 gap-4",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Price Change"}),(0,t.jsx)("p",{className:"font-medium ".concat(e.priceChange.startsWith("+")?"text-green-600":"text-red-600"),children:e.priceChange})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Volume Impact"}),(0,t.jsx)("p",{className:"font-medium ".concat(e.volumeImpact.startsWith("+")?"text-green-600":"text-red-600"),children:e.volumeImpact})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Revenue Impact"}),(0,t.jsx)("p",{className:"font-medium ".concat(e.revenueImpact.startsWith("+")?"text-green-600":"text-red-600"),children:e.revenueImpact})]})]}),(0,t.jsx)("div",{className:"mt-4",children:(0,t.jsxs)(v.z,{variant:"outline",size:"sm",className:"w-full",children:["Apply Scenario",(0,t.jsx)(S.Z,{className:"h-4 w-4 ml-2"})]})})]},s))})})]})]})]})}},46632:function(e,s,a){a.d(s,{DashboardProvider:function(){return o},Q:function(){return d}});var t=a(57437),r=a(2265),i=a(88906),n=a(70525);let l=(0,r.createContext)(void 0),c=e=>{let{children:s}=e,[a,c]=(0,r.useState)({metrics:{grossMargin:12.5,targetMargin:15,currentPrice:1.859,inventoryLevel:65,projectedDemand:15e3,revenue:27865,volumeSold:200,customerCount:80},competitors:[{id:"1",name:"Station A",price:1.85,distance:2.1,latitude:48.8566,longitude:2.3522,priceComparison:"above"},{id:"2",name:"Station B",price:1.79,distance:3.5,latitude:48.8504,longitude:2.3482,priceComparison:"below"},{id:"3",name:"Station C",price:1.82,distance:4.2,latitude:48.8532,longitude:2.3562,priceComparison:"equal"},{id:"4",name:"Station D",price:1.83,distance:5.1,latitude:48.8587,longitude:2.3501,priceComparison:"above"},{id:"5",name:"Station E",price:1.77,distance:2.8,latitude:48.8545,longitude:2.3512,priceComparison:"below"}],marketData:{competitorAvgPrice:1.849,marketShare:28.5,pricePosition:"above",nearbyCompetitors:5,avgDailyRevenue:15750,avgVolumeSold:8500,avgCustomerCount:450},rules:[{id:"min-margin",name:"Minimum Margin Protection",description:"Maintain minimum gross margin threshold",enabled:!0,threshold:5,icon:(0,t.jsx)(i.Z,{className:"h-5 w-5"}),category:"protection",conditions:[{type:"price",operator:"greater",value:5}],actions:[{type:"notify",value:2}],priority:1,statistics:{timesTriggered:15,lastSuccess:new Date,averageImpact:2.3,failureRate:.1}},{id:"competitor-match",name:"Competitor Matching",description:"Automatically match competitor prices within range",enabled:!0,threshold:2,icon:(0,t.jsx)(n.Z,{className:"h-5 w-5"}),category:"optimization",conditions:[{type:"price",operator:"less",value:-.02}],actions:[{type:"adjust_price",value:100}],priority:2,statistics:{timesTriggered:28,lastSuccess:new Date,averageImpact:1.8,failureRate:.15}}],notifications:[{id:"1",message:"Competitor price change detected",type:"warning",timestamp:new Date},{id:"2",message:"Margin target achieved",type:"success",timestamp:new Date},{id:"3",message:"New pricing rule activated",type:"info",timestamp:new Date}],settings:{currency:"EUR",timezone:"Europe/Paris",refreshInterval:5},view:"overview"});(0,r.useEffect)(()=>{let e=setInterval(()=>{d({grossMargin:a.metrics.grossMargin+(Math.random()-.5)*.1,revenue:a.metrics.revenue+(Math.random()-.5)*100,volumeSold:a.metrics.volumeSold+(Math.random()-.5)*10})},1e3*a.settings.refreshInterval);return()=>clearInterval(e)},[a.settings.refreshInterval]);let d=e=>{c(s=>({...s,metrics:{...s.metrics,...e}}))};return(0,t.jsx)(l.Provider,{value:{...a,updateMetrics:d,updateCompetitors:e=>{c(s=>({...s,competitors:e}))},updateMarketData:e=>{c(s=>({...s,marketData:{...s.marketData,...e}}))},updateRules:e=>{c(s=>({...s,rules:e}))},addNotification:e=>{c(s=>({...s,notifications:[e,...s.notifications]}))},markNotificationRead:e=>{c(s=>({...s,notifications:s.notifications.map(s=>s.id===e?{...s,read:!0}:s)}))},setView:e=>{c(s=>({...s,view:e}))},updateSettings:e=>{c(s=>({...s,settings:{...s.settings,...e}}))}},children:s})},d=()=>{let e=(0,r.useContext)(l);if(void 0===e)throw Error("useDashboard must be used within a DashboardProvider");return e},o=e=>{let{children:s}=e;return(0,t.jsx)(c,{children:s})}},35974:function(e,s,a){a.d(s,{C:function(){return l}});var t=a(57437);a(2265);var r=a(77712),i=a(94508);let n=(0,r.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function l(e){let{className:s,variant:a,...r}=e;return(0,t.jsx)("div",{className:(0,i.cn)(n({variant:a}),s),...r})}},62869:function(e,s,a){a.d(s,{z:function(){return d}});var t=a(57437),r=a(2265),i=a(37053),n=a(77712),l=a(94508);let c=(0,n.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=r.forwardRef((e,s)=>{let{className:a,variant:r,size:n,asChild:d=!1,...o}=e,m=d?i.g7:"button";return(0,t.jsx)(m,{className:(0,l.cn)(c({variant:r,size:n,className:a})),ref:s,...o})});d.displayName="Button"},66070:function(e,s,a){a.d(s,{Ol:function(){return l},Zb:function(){return n},aY:function(){return d},ll:function(){return c}});var t=a(57437),r=a(2265),i=a(94508);let n=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)("div",{ref:s,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",a),...r})});n.displayName="Card";let l=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)("div",{ref:s,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",a),...r})});l.displayName="CardHeader";let c=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)("div",{ref:s,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",a),...r})});c.displayName="CardTitle",r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)("div",{ref:s,className:(0,i.cn)("text-sm text-muted-foreground",a),...r})}).displayName="CardDescription";let d=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)("div",{ref:s,className:(0,i.cn)("p-6 pt-0",a),...r})});d.displayName="CardContent",r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)("div",{ref:s,className:(0,i.cn)("flex items-center p-6 pt-0",a),...r})}).displayName="CardFooter"},53647:function(e,s,a){a.d(s,{Bw:function(){return p},Ph:function(){return o},Ql:function(){return f},i4:function(){return x},ki:function(){return m}});var t=a(57437),r=a(2265),i=a(56873),n=a(40875),l=a(22135),c=a(30401),d=a(94508);let o=i.fC;i.ZA;let m=i.B4,x=r.forwardRef((e,s)=>{let{className:a,children:r,...l}=e;return(0,t.jsxs)(i.xz,{ref:s,className:(0,d.cn)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",a),...l,children:[r,(0,t.jsx)(i.JO,{asChild:!0,children:(0,t.jsx)(n.Z,{className:"h-4 w-4 opacity-50"})})]})});x.displayName=i.xz.displayName;let u=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)(i.u_,{ref:s,className:(0,d.cn)("flex cursor-default items-center justify-center py-1",a),...r,children:(0,t.jsx)(l.Z,{className:"h-4 w-4"})})});u.displayName=i.u_.displayName;let h=r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)(i.$G,{ref:s,className:(0,d.cn)("flex cursor-default items-center justify-center py-1",a),...r,children:(0,t.jsx)(n.Z,{className:"h-4 w-4"})})});h.displayName=i.$G.displayName;let p=r.forwardRef((e,s)=>{let{className:a,children:r,position:n="popper",...l}=e;return(0,t.jsx)(i.h_,{children:(0,t.jsxs)(i.VY,{ref:s,className:(0,d.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===n&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",a),position:n,...l,children:[(0,t.jsx)(u,{}),(0,t.jsx)(i.l_,{className:(0,d.cn)("p-1","popper"===n&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:r}),(0,t.jsx)(h,{})]})})});p.displayName=i.VY.displayName,r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)(i.__,{ref:s,className:(0,d.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold",a),...r})}).displayName=i.__.displayName;let f=r.forwardRef((e,s)=>{let{className:a,children:r,...n}=e;return(0,t.jsxs)(i.ck,{ref:s,className:(0,d.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),...n,children:[(0,t.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,t.jsx)(i.wU,{children:(0,t.jsx)(c.Z,{className:"h-4 w-4"})})}),(0,t.jsx)(i.eT,{children:r})]})});f.displayName=i.ck.displayName,r.forwardRef((e,s)=>{let{className:a,...r}=e;return(0,t.jsx)(i.Z0,{ref:s,className:(0,d.cn)("-mx-1 my-1 h-px bg-muted",a),...r})}).displayName=i.Z0.displayName},94508:function(e,s,a){a.d(s,{cn:function(){return i}});var t=a(61994),r=a(53335);function i(){for(var e=arguments.length,s=Array(e),a=0;a<e;a++)s[a]=arguments[a];return(0,r.m6)((0,t.W)(s))}}}]);