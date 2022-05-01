import {ReactSession} from 'react-client-session';

// SOME DATE FUNCTIONS
function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

function getDateDifference(dateA, DateB, type = 'month') {
  const END_DAY = new Date(dateA)
  const START_DAY = new Date(DateB)
  let calculatedDateBy
  let returnDateDiff
  if (type === 'month') {
    const startMonth = START_DAY.getMonth()
    const endMonth = END_DAY.getMonth()
    calculatedDateBy = startMonth - endMonth
    returnDateDiff = Math.abs(
      calculatedDateBy + 12 * (START_DAY.getFullYear() - END_DAY.getFullYear())
    )
  } else {
    calculatedDateBy = Math.abs(START_DAY - END_DAY)
    returnDateDiff = Math.ceil(calculatedDateBy / (1000 * 60 * 60 * 24))
  }
  return returnDateDiff
}

// END OF DATE FUNCTIONS

export const fetchFlights = async (origin, destination,departureDate,returnDate) => {
  console.log(origin, destination,departureDate,returnDate)
  var data = {origin: origin, destination: destination, action: "search"}
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

export const fetchSignUpCustomer = async (username, password, firstName, lastName, buildingNumber, street, city, state_, phoneNumber, passportNumber, passportExpiration, passportCountry) => {
  console.log(username, password, firstName, lastName, buildingNumber, street, city, state_, phoneNumber, passportNumber, passportExpiration, passportCountry)
  var data = {username: username, password: password, firstName: firstName, lastName: lastName, buildingNumber: buildingNumber, street: street, city: city, state_: state_, phoneNumber: phoneNumber, passportNumber: passportNumber, passportExpiration: passportExpiration, passportCountry: passportCountry, action: "signUp", userType: "customer"}
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  // return res
  // then(res => res.json())
  // .then(res => {return res}).catch(err=>console.log(err))
}

export const fetchSignUpStaff = async (username, password, companyName, firstName, lastName, dob, phoneNumber) => {
  console.log(username, password, companyName, firstName, lastName, dob)
  var data = {username: username, password: password, companyName: companyName, firstName: firstName, lastName: lastName, dob:dob, phoneNumber:phoneNumber, action: "signUp", userType: "staff"}
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  await fetchLogin(username, password, "staffLogin")
  // return res
  // then(res => res.json())
  // .then(res => {return res}).catch(err=>console.log(err))
}

export const fetchLogin = async (username, password, loginType) => {
  console.log(username, password)
  try{
    var data = {username: username, password: password, action: loginType}
    var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        body: JSON.stringify(data)
      }
    )
    res = await res.json()
    console.log(res)
    if (res["loginSucceeded"] && loginType == "customerLogin"){
      ReactSession.set("username",username)
      var firstName = res["row"][1]
      var lastName = res["row"][2]
      ReactSession.set("firstName", firstName)
      ReactSession.set("lastName", lastName)
      ReactSession.set("userType",(loginType)=="staffLogin"?"staff":"customer")
      ReactSession.set('loggedIn',true)
      if (loginType=="customerLogin"){
        ReactSession.set("expDate",res["row"][9])
      }
    }
    else if (res["loginSucceeded"]){
      ReactSession.set("username",username)
      var firstName = res["row"][2]
      var lastName = res["row"][3]
      var companyName = res["row"][1]
      ReactSession.set("firstName", firstName)
      ReactSession.set("lastName", lastName)
      ReactSession.set("companyName", companyName)
      ReactSession.set("userType","staff")
      ReactSession.set('loggedIn',true)
      if (loginType=="customerLogin"){
        ReactSession.set("expDate",res["row"][9])
      }
    }
    return res
  }
  catch(e){
    console.log(e);
    return {loginSucceeded: false}
  }
  // then(res => res.json())
  // .then(res => {return res}).catch(err=>console.log(err))
}

export const purchaseTicket = async (_class,cardNumber,cardType, flight) => {
  try{var data = {
    companyName: flight[0],
    flightNumber: flight[1],
    departureTime: flight[2],
    travelClass: _class,
    soldPrice: flight[8],
    cardNumber: cardNumber,
    cardType: cardType,
    expDate: ReactSession.get("expDate"),
    email: ReactSession.get("username"),
    action:"buyTicket",
    firstName: ReactSession.get("firstName"),
    lastName: ReactSession.get("lastName")
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  return res}
  catch(e){
    console.log(e)
    return {success: false}
  }
}

export const fetchMyFlights = async (navigate) => {
  var data = {
    email: ReactSession.get("username"),
    action: "getMyFlights"
  }
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/my-flights',{state:{flights:res, modalVisible:false}})
  // return res
}

export const fetchAirlineFlights = async (navigate) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    action: "getAirlineFlights"
  }
  console.log(data)
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/airline-flights',{state:{flights:res, modalVisible:false}})
  // return res
}

export const fetchFlightRatings = async (navigate, flightNumber) => {
  var data = {
    flightNumber: flightNumber,
    action: "getFlightRatings"
  }
  console.log(data)
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/flight-ratings',{state:{ratings:res, modalVisible:false, flightNumber: flightNumber}})
  // return res
}

export const fetchFrequentCustomer = async (navigate) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    action: "getMostFrequentCustomer"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/most-frequent-customer',{state:{mfqEmail: res[0][0], mfqFlights: res[0][1]}})
  // return res
}

export const fetchCustomerAirlineFlights = async (navigate, email) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    email: email,
    action: "getCustomerAirlineFlights"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/customer-flights',{state:{flights:res}})
}

export const fetchEarnedRevenue = async (startDate, endDate) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    startDate: startDate.toISOString().slice(0, 19).replace('T', ' '),
    endDate: endDate.toISOString().slice(0, 19).replace('T', ' '),
    action: "getEarnedRevenue"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  return res
  // navigate('/pages/landing-pages/earned-revenue',{state:{flights:res, modalVisible:false}})
  // return res
}

export const fetchRevenueByClass = async () => {
  var data = {
    companyName: ReactSession.get("companyName"),
    action: "getEarnedRevenueGroupByClass"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  return res
  // navigate('/pages/landing-pages/earned-revenue',{state:{flights:res, modalVisible:false}})
  // return res
}

export const fetchTopDestinations = async (navigate, startDate, endDate) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    startDate: startDate.toISOString().slice(0, 19).replace('T', ' '),
    endDate: endDate.toISOString().slice(0, 19).replace('T', ' '),
    action: "getTopDestinations"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  return res
  // return res
}

export const fetchTopDestinationStuff = async (navigate) => {
  const topDestinationsLast3Months = await fetchTopDestinations(navigate, addMonths(new Date(),-3), new Date())
  const topDestinationsLastYear = await fetchTopDestinations(navigate, addMonths(new Date(),-12), new Date())
  navigate('/pages/landing-pages/top-destinations',{state:{topDestinationsLast3Months:topDestinationsLast3Months, topDestinationsLastYear:topDestinationsLastYear}})
  // return res
}

export const postNewFlight = async (navigate,flightNumber,departureTime,aircraftID, departureAirport, arrivalAirport, arrivalTime,status, basePrice) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    flightNumber: flightNumber,
    departureTime: departureTime,
    aircraftID: aircraftID,
    departureAirport: departureAirport,
    arrivalAirport: arrivalAirport,
    arrivalTime: arrivalTime,
    status: status,
    basePrice: basePrice,
    action: "postNewFlight"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/staff',{state:{showAlert:true,alertMessage:"Successfully created flight"}})
  // return res
}

export const changeFlightStatus = async (navigate, flightNumber, status) => {
  var data = {
    flightNumber: flightNumber,
    status: status,
    action: "changeFlightStatus"
  }
  console.log(data)
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  fetchAirlineFlights(navigate)
  // return res
}

export const addAirport = async (navigate,airportCode, airportName, airportCity, airportCountry,airportType) => {
  var data = {
    action: "postAirport",
    companyName: ReactSession.get("companyName"),
    code: airportCode,
    name: airportName,
    city: airportCity,
    country: airportCountry,
    type: airportType
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/staff',{state:{showAlert:true,alertMessage:"Successfully created airport"}})
  // return res
}

export const addAirplane = async (navigate,aircraftID, seats, manuCompany, age) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    action: "postAirplane",
    aircraftID: aircraftID,
    seats: seats,
    manuCompany: manuCompany,
    age: age
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  navigate('/pages/landing-pages/staff',{state:{showAlert:true,alertMessage:"Successfully created airplane"}})
  // return res
}

export const cancelFlight = async (navigate, flight) => {
  var data = {
    ticketNumber: flight[0],
    action: "cancelMyFlight"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  fetchMyFlights(navigate)
  // return res
}

export const postFeedback = async (ticketNumber,comment, stars) => {
  var data = {
    ticketNumber:ticketNumber,
    comment: comment,
    stars: stars,
    action: "postFeedback"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  // return res
}

const fetchMySpending = async (startDate, endDate) => {
  var data = {
    email: ReactSession.get("username"),
    startDate: startDate.toISOString().slice(0, 19).replace('T', ' '),
    endDate: endDate.toISOString().slice(0, 19).replace('T', ' '),
    action: "getMySpending"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  return res
}

const fetchAirlineSoldTickets = async (startDate, endDate) => {
  var data = {
    companyName: ReactSession.get("companyName"),
    startDate: startDate.toISOString().slice(0, 19).replace('T', ' '),
    endDate: endDate.toISOString().slice(0, 19).replace('T', ' '),
    action: "getSoldTickets"
  }
  console.log(JSON.stringify(data))
  var res = await fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  )
  res = await res.json()
  console.log(res)
  return res
}

export const fetchReport = async (startDate, endDate, navigate) => {
  console.log(endDate)
  const monthsElapsed = getDateDifference(startDate, endDate, 'month')
  console.log(monthsElapsed)
  var months = [];
  var totalSpent= 0;
  for (var i = 0; i < monthsElapsed; i++){
    var _startDate = addMonths(new Date(endDate), -i-1)
    var _endDate = addMonths(new Date(endDate), -i)
    var _res = await fetchAirlineSoldTickets(_startDate,_endDate)
    var month = _endDate.toISOString().slice(0,7)
    months = [{label:month,y:_res["totalTicketsSold"]},...months]
    totalSpent += _res["totalTicketsSold"]
  }
  navigate('/pages/landing-pages/airline-reports',{state:{sales:months, totalTicketsSold: totalSpent, startDate: startDate, endDate: endDate}} )
}

export const fetchTotalRevenue = async (startDate, endDate, navigate) => {
  console.log(endDate)
  const monthsElapsed = getDateDifference(startDate, endDate, 'month')
  console.log(monthsElapsed)
  var months = [];
  var totalRevenue= 0;
  for (var i = 0; i < monthsElapsed; i++){
    var _startDate = addMonths(new Date(endDate), -i-1)
    var _endDate = addMonths(new Date(endDate), -i)
    var _res = await fetchEarnedRevenue(_startDate,_endDate)
    var month = _endDate.toISOString().slice(0,7)
    months = [{label:month,y:_res["totalRevenue"]},...months]
    totalRevenue += _res["totalRevenue"]
  }
  const revenueByClass = await fetchRevenueByClass();
  navigate('/pages/landing-pages/airline-revenue',{state:{sales:months, totalRevenue: totalRevenue, startDate: startDate, endDate: endDate, revenueByClass: revenueByClass}} )
}

export const monthlyBreakdown = async (startDate, endDate, navigate) => {
  console.log(endDate)
  const monthsElapsed = getDateDifference(startDate, endDate, 'month')
  console.log(monthsElapsed)
  var months = [];
  var totalSpent= 0;
  for (var i = 0; i < monthsElapsed; i++){
    var _startDate = addMonths(new Date(endDate), -i-1)
    var _endDate = addMonths(new Date(endDate), -i)
    var _res = await fetchMySpending(_startDate,_endDate)
    var month = _endDate.toISOString().slice(0,7)
    months = [{label:month,y:_res["totalSpent"]},...months]
    totalSpent += _res["totalSpent"]
  }
  navigate('/pages/landing-pages/my-spending',{state:{spending:months, totalSpent: totalSpent, startDate: startDate, endDate: endDate}} )
}
