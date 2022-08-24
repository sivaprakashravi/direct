import * as d3 from 'd3';

export class D3GlobalConstants{
  public static metaColorOpacity=0.5;
  public static metaColors=[
    'rgba(202,88,183,'+D3GlobalConstants.metaColorOpacity+')',
    'rgba(251,238,62,'+D3GlobalConstants.metaColorOpacity+')',
    'rgba(86,180,233,'+D3GlobalConstants.metaColorOpacity+')',
    'rgba(144,65,0,'+D3GlobalConstants.metaColorOpacity+')',
    'rgba(0,60,60,'+D3GlobalConstants.metaColorOpacity+')'
  ]  
} 

export function log10(val: number) {
  return Math.log(val) / Math.LN10;
}

export function colorlegend(target: any, scale: any, type: any, options: any) {
  var scaleTypes = ['linear', 'quantile', 'ordinal']
    , found = false
    , opts = options || {}
    , boxWidth = opts.boxWidth || 20        // width of each box (int)
    , boxHeight = opts.boxHeight || 20      // height of each box (int)
    , title = opts.title || null            // draw title (string)
    , fill = opts.fill || false             // fill the element (boolean)
    , linearBoxes = opts.linearBoxes || 9   // number of boxes for linear scales (int)
    , htmlElement = target //document.getElementById(target.substring(0, 1) === '#' ? target.substring(1, target.length) : target)  // target container element - strip the prefix #
    , w = htmlElement.offsetWidth           // width of container element
    , h = htmlElement.offsetHeight          // height of container element
    , colors: any = []
    , padding = [2, 4, 10, 4]               // top, right, bottom, left
    , boxSpacing = type === 'ordinal' ? 3 : 0 // spacing between boxes
    , titlePadding = title ? 11 : 0
    , domain = scale.domain()
    , range = scale.range()
    , i = 0;

  // check for valid input - 'quantize' not included
  for (i = 0; i < scaleTypes.length; i++) {
    if (scaleTypes[i] === type) {
      found = true;
      break;
    }
  }
  if (!found) {
    throw new Error('Scale type, ' + type + ', is not suported.');
  }

  // setup the colors to use
  if (type === 'quantile') {
    colors = range;
  }
  else if (type === 'ordinal') {
    for (i = 0; i < domain.length; i++) {
      colors[i] = range[i];
    }
  }
  else if (type === 'linear') {
    var min = domain[0];
    var max = domain[domain.length - 1];
    for (i = 0; i <= linearBoxes; i++) {
      colors[i] = scale(min + i * ((max - min) / linearBoxes));
    }
  }
  // check the width and height and adjust if necessary to fit in the element
  // use the range if quantile
  if (fill || w < (boxWidth + boxSpacing) * colors.length + padding[1] + padding[3]) {
    boxWidth = (w - padding[1] - padding[3] - (boxSpacing * colors.length)) / colors.length;
  }
  if (fill || h < boxHeight + padding[0] + padding[2] + titlePadding) {
    boxHeight = h - padding[0] - padding[2] - titlePadding;
  }

  // set up the legend graphics context
  var legend = d3.select(target)
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .attr('class', 'colorlegend')
    .attr('transform', 'translate(' + padding[3] + ',' + padding[0] + ')')
    .style('font-size', '11px')
    .style('fill', '#666');

  var legendBoxes = legend.selectAll('g.legend')
    .data(colors)
    .enter().append('g');

  // value labels
  legendBoxes.append('text')
    .attr('class', 'colorlegend-labels')
    .attr('dy', '.71em')
    .attr('x', function (d, i) {
      return i * (boxWidth + boxSpacing) + (type !== 'ordinal' ? (boxWidth / 2) : 0);
    })
    .attr('y', function () {
      return boxHeight + 2;
    })
    .style('text-anchor', function () {
      return type === 'ordinal' ? 'start' : 'middle';
    })
    .style('pointer-events', 'none')
    .text(function (d, i) {
      // show label for all ordinal values
      if (type === 'ordinal') {
        return domain[i];
      }
      // show only the first and last for others
      else {
        if (i === 0) { return domain[0].toPrecision(2); }
        if (i === colors.length - 1) { return domain[domain.length - 1].toPrecision(2); }
      }
    });

  // the colors, each color is drawn as a rectangle
  legendBoxes.append('rect')
    .attr('x', function (d, i) {
      return i * (boxWidth + boxSpacing);
    })
    .attr('width', boxWidth)
    .attr('height', boxHeight)
    .style('fill', function (d, i) { return colors[i]; });

  // show a title in center of legend (bottom)
  if (title) {
    legend.append('text')
      .attr('class', 'colorlegend-title')
      .attr('x', (colors.length * (boxWidth / 2)))
      .attr('y', boxHeight + titlePadding)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .text(title);
  }
}

var outputTSpan=function(el: any,line: any,idx: any,lineCnt: any,charEm: any,headerBtmPadEm: any,fill: any,fontFamily: any,fontSize: any,tAnchor: any,tAlign: any,domBaseline: any,cssClass: any,x: any,y: any) {
	// shift lines down by index, and up by 1/2 line count, minus 1 line for title
	var dyVal=( ( (idx*charEm) - ( (lineCnt*0.5)*charEm) + charEm ) + headerBtmPadEm );
	d3.select(el).append("tspan")
		.text(line)
		.attr("dy", dyVal+"em") // y offset per line index
		.attr("x", x) 
		.attr("y", 0) 
		.style('fill',fill)
		.style('font-family',fontFamily)
		.style('font-size',fontSize)
		.style('text-anchor',tAnchor)
		.style('text-align',tAlign)
		.style('dominant-baseline',domBaseline)
		.attr("class", cssClass);
}

export function wrapText (text: string,el: any,boxWidth: number,charWidthPx: number,maxLines: number,charEm: any,headerBtmPadEm: any,fill: any,fontFamily: any,fontSize: any,tAnchor: any,tAlign: any,domBaseline: any,cssClass: any,x?: number,y?: number) {
	var arr = text.split(" "); // array split by space
	if (! x) { x = 0; } // optional x value to shift text
	if (! y) { y = 0; } // optional y value to shift text
	if (arr !== undefined) {
		var linePxW=0; // counting approximate pixel width- will only work well for monospaced font.  choose an average value on the low side.
		var linePxWNext=0; // counting what the character count will be for i+1 words, to pre-determine how to wrap or hyphenate
		var ln=0; // line count
		var outLines=[];
		var myLine="";
		// split any hyphenated words that are longer than a line.
		for (var i=0;i<arr.length;i++) {
			var undIdx=arr[i].indexOf("-");
			if (undIdx>0) {
				var wordPxW=(arr[i].length * charWidthPx);
				if (wordPxW >= boxWidth) {
					var firstPart=(arr[i].substring(0, (undIdx+1)));
					var lastPart=(arr[i].substring(undIdx+1));
					arr.splice( i, 1, firstPart, lastPart );
				}
			}
		}
		for (i=0;i<arr.length;i++) {
			// get approximate px width of word arr[i]
			wordPxW=(arr[i].length * charWidthPx);
			linePxW+=wordPxW; // current pixel width of the line
			linePxWNext=linePxW;
			// width line will be, after adding the next word, if one exists
			if (arr[i+1]) { linePxWNext=(linePxWNext+1+(arr[i+1].length * charWidthPx)); }
			myLine=(myLine+" "+arr[i]);
			// if we will exceed the max width in px, wrap the line.
			if (linePxWNext >= boxWidth) {
				// if word is too long, hyphenate here 
				// if max lines exceeded, truncate and add ...
				// position text lines from center, offset + or -
				outLines.push(myLine);
				ln++; // increment the line
				linePxW=0; // reset the line px count
				linePxWNext=0; // reset the line px next count
				myLine=""; // reset the line txt
			} else if (outLines.length && (!arr[i+1])) {
				// this is the last line, and we're already building the multi-line arr so go with it
				outLines.push(myLine);
			}
		}
		// generate the text lines using our line array
		if (outLines.length) {
			var outLinesTot=outLines.length;
			if (outLinesTot > maxLines) { outLinesTot = maxLines; }
			for (i=0;i<outLines.length;i++) {
				if ((i>=(maxLines-1)) && (outLines[i+1])) {
					var toOutput = (outLines[i]+"..."); // truncate
					outputTSpan(el,toOutput,i,outLinesTot,charEm,headerBtmPadEm,fill,fontFamily,fontSize,tAnchor,tAlign,domBaseline,cssClass,x,y);
					break;
				}
				outputTSpan(el,outLines[i],i,outLinesTot,charEm,headerBtmPadEm,fill,fontFamily,fontSize,tAnchor,tAlign,domBaseline,cssClass,x,y);
			}
		} else {
			outputTSpan(el,text,0,1,charEm,headerBtmPadEm,fill,fontFamily,fontSize,tAnchor,tAlign,domBaseline,cssClass,x,y);
		}
	}
}
