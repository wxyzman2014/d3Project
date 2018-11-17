function example1() {
		var marge = {top:60,bottom:60,left:60,right:60}
    	var svg = d3.select("svg");//得到SVG画布
    	var width = svg.attr("width");//得到画布的宽
    	var height = svg.attr("height");//得到画布的长
    	var g = svg.append("g")
    		.attr("transform","translate("+marge.top+","+marge.left+")");
    	
    	var dataset = [10,20,30,23,13,40,27,35,20];
   
    	var xScale = d3.scaleBand()
    		.domain(d3.range(dataset.length))
    		.rangeRound([0,width-marge.left-marge.right]);
    	var xAxis = d3.axisBottom(xScale);
    		
    	var yScale = d3.scaleLinear()
    		.domain([0,d3.max(dataset)])
    		.range([height-marge.top-marge.bottom,0]);
    	var yAxis = d3.axisLeft(yScale);
    	
    	g.append("g")
    		.attr("transform","translate("+0+","+(height-marge.top-marge.bottom)+")")
    		.call(xAxis);
    	g.append("g")
    		.attr("transform","translate(0,0)")
    		.call(yAxis);
    		
    	//绘制矩形和文字
    	var gs = g.selectAll(".rect")
    		.data(dataset)
    		.enter()
    		.append("g");
    	
    	//绘制矩形
    	var rectPadding = 20;//矩形之间的间隙
    	gs.append("rect")
    		.attr("x",function(d,i){
    			return xScale(i)+rectPadding/2;
    		})	
    		.attr("y",function(d){
    			return yScale(d);
    		})
    		.attr("width",function(){
    			return xScale.step()-rectPadding;
    		})
    		.attr("height",function(d){
    			return height-marge.top-marge.bottom-yScale(d);
    		})
    		.attr("fill","blue")
    		.on("mouseover",function(){
    			var rect = d3.select(this)
    				.transition()
    				.duration(1500)
    				.attr("fill","yellow");
    		})
    		.on("mouseout",function(){
    			var rect = d3.select(this)
    				.transition()
    				.delay(1500)
    				.duration(1500)
    				.attr("fill","blue");
    		})
    	//绘制文字
    	gs.append("text")
    		.attr("x",function(d,i){
    			return xScale(i)+rectPadding/2;
    		})
    		.attr("y",function(d){
            return yScale(d);
        	})
        	.attr("dx",function(){
        		(xScale.step()-rectPadding)/2;
        	})
        	.attr("dy",20)
        	.text(function(d){
        		return d;
        	})
}

function example2() {

		var marge = {top:60,bottom:60,left:60,right:60}
    	var svg = d3.select("svg")
    	var width = svg.attr("width")
    	var height = svg.attr("height")
    	var g = svg.append("g")
    		.attr("transform","translate("+marge.top+","+marge.left+")");
    		
    	var dataset = [ 30 , 10 , 43 , 55 , 13 ];
    	
    	//设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
    	var colorScale = d3.scaleOrdinal()
    		.domain(d3.range(dataset.length))
    		.range(d3.schemeCategory10);
    	
    	//新建一个饼状图
    	var pie = d3.pie();
    	
    	//新建一个弧形生成器
    	var innerRadius = 0;//内半径
    	var outerRadius = 100;//外半径
    	var arc_generator = d3.arc()
    		.innerRadius(0)
    		.outerRadius(100);
    		
    	//将原始数据变成可以绘制饼状图的数据，
    	var pieData = pie(dataset);
    	
    	//在浏览器的控制台打印pieData
    	console.log(pieData);
    	
    	//在有了绘制饼状图必须的数据后，我们就可以开始绘制了
    	var gs = g.selectAll(".g")
    		.data(pieData)
    		.enter()
    		.append("g")
    		.attr("transform","translate("+width/2+","+height/2+")")//位置信息
    		
    	//绘制饼状图的各个扇形
    	gs.append("path")
    		.attr("d",function(d){
    			return arc_generator(d);//往弧形生成器中出入数据
    		})
    		.attr("fill",function(d,i){
    			return colorScale(i);
    		});
    		
    	//绘制饼状图上面的文字信息
    	gs.append("text")
    		.attr("transform",function(d){//位置设在中心处
    			return "translate("+arc_generator.centroid(d)+")";
    		})
    		.attr("text-anchor","middle")
    		.text(function(d){
    			return d.data;
    		})


}