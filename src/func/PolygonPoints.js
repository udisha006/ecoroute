function PolygonPoints() {

    let polypoints = waypoints
    let PolyLength = polypoints.length;
   
  
    let UpperBound = [];
    let LowerBound = [];
  
    for (let j = 0; j <= PolyLength - 1; j++) {
      let NewPoints = PolygonArray(polypoints[j][0]);
      UpperBound.push({ lat: NewPoints[0], lng: polypoints[j][1] });
      LowerBound.push({ lat: NewPoints[1], lng: polypoints[j][1] });
    }
     let reversebound = LowerBound.reverse();
   
    let FullPoly = UpperBound.concat(reversebound);
   
    return FullPoly;
  }