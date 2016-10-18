//API Key for sunlight foundation: 149a2a8730aa4936bab76017c47d8dab

var legislatorBoxNode = document.querySelector('.legislator-container'),
	searchBarNode = document.querySelector('input')

//use ternary operator to check if property of an object exists. True = return property. False = return no
var getter = function(prop) {
	return this[prop] ? this[prop] : 'no ' + cleanGetter(prop) + ' available'
}

//Cleans specific data for the getter string output if none are available.
var cleanGetter = function(word) {
	if(word ==="oc_email"){
		return "email"
	}
	if(word ==="facebook_id"){
		return "facebook"
	}
	if(word ==="twitter_id"){
		return "twitter"
	}
	return word
}

var readData = function(apiResponse) {
	var htmlString = ""
	var legislatorsArray = apiResponse.results
	for (var i = 0; i < legislatorsArray.length; i++){
		var legislatorObject = legislatorsArray[i]
		//used for more declarative programming below
		legislatorObject.get = getter
		htmlString += "<div class='legislator-box'>"
			htmlString += "<div class='legislator-details'>"
		        htmlString += "<h1 class='name'>" + legislatorObject.first_name + " " + legislatorObject.last_name + "</h1>"
		        htmlString += "<h2 class='position'>" + legislatorObject.title + "--" + legislatorObject.party +
		        			  "-" + legislatorObject.state_name + "</h2>"
		        htmlString += "<ul class='contact-info'>"
			        htmlString += "<li class='email'>Email: " + legislatorObject.get('oc_email') + "</li>"
			        htmlString += "<li class='website'>Website: " + legislatorObject.get('website') + "</li>"
			        htmlString += "<li class='facebook'>Facebook: " + legislatorObject.get('facebook_id') + "</li>"
			        htmlString += "<li class='twitter'>Twitter: " + legislatorObject.get('twitter_id') + "</li>"
		        htmlString += '</ul>'
		        htmlString += "<h5 class='term-end'>Term ends: " + legislatorObject.term_end + "</h5>"
	    	 htmlString += '</div>'
    	 htmlString += '</div>'
	}
	legislatorBoxNode.innerHTML = htmlString
}

var searchLegislators = function(searchTerm) {
    var legislatorsUrl = "https://congress.api.sunlightfoundation.com/legislators/",
    	apiKey = "apikey=149a2a8730aa4936bab76017c47d8dab&per_page=50",
    	searchUrl = "locate?zip="

    if (searchTerm){
    	legislatorsUrl += searchUrl + searchTerm + "&" + apiKey
    } else {
    	legislatorsUrl += "?" + apiKey
    }
    console.log(legislatorsUrl)
	var promise = $.getJSON(legislatorsUrl)
	promise.then(readData)
}

var getSearchBarData = function(eventObject) {
    if (eventObject.keyCode === 13) {
        var userInput = eventObject.target
        return searchLegislators(userInput.value)
    }
}

searchLegislators()
searchBarNode.addEventListener('keydown', getSearchBarData)





