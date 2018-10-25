fetch("https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=V5OFRJzFtF6fJPiVjgSOPMPNO")
    .then((response) => response.json())
    .then((parsedData) => {
        console.table(parsedData[0])
        console.log(parsedData[0].park_name)
    })