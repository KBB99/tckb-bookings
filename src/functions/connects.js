export const fetchFlights = async (origin, destination,departureDate,returnDate) => {
  console.log(origin, destination,departureDate,returnDate)
  var data = {origin: origin, destination: destination}
  if (departureDate != ""){
    data.departureDate = departureDate
  }
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = res.json()
  return res
  // then(res => res.json())
  // .then(res => {return res}).catch(err=>console.log(err))
}
