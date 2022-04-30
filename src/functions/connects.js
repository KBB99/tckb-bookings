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
  res = res.json()
  console.log(res)
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
    if (res["loginSucceeded"]){
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

export const monthlyBreakdown = async (startDate, endDate, navigate) => {
  console.log(endDate)
  const monthsElapsed = getDateDifference(startDate, endDate, 'month')
  console.log(monthsElapsed)
  var months = [];
  var totalSpent= 0;
  for (var i = 0; i < monthsElapsed; i++){
    var _startDate = addMonths(new Date(endDate), -i-1)
    var _endDate = addMonths(endDate, -i)
    var _res = await fetchMySpending(_startDate,_endDate)
    months = [...months,_res["totalSpent"]]
    totalSpent += _res["totalSpent"]
  }
  navigate('/pages/landing-pages/my-spending',{state:{months:months, totalSpent: totalSpent}} )
}
