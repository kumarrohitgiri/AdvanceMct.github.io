const displayUser = document.getElementById("display-user")
const searchUser = document.getElementById("search-user")
const tweet_btn = document.getElementById("search-tweet")
const tweet_input = document.getElementById("tweet-input")
const display_tweets = document.getElementById("display-tweets")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '247a92c9demshb73b79f393d6932p131fe5jsn07845c746f08',
		'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
	}
};

const handleTweet = e => {
    e.preventDefault()
    const userName = searchUser.value
    const numOfTweets = tweet_input.value
    if (!userName || !numOfTweets) {
        window.alert("Please provide both input!!")
        
    } else {

        const arr = []
        const usersArr = []
        const loading = document.createElement("h2")
        loading.setAttribute('id', "loading")
        loading.textContent = "loading......"
        displayUser.appendChild(loading)

        fetch(`https://twitter135.p.rapidapi.com/Search/?q=${userName}&count=${numOfTweets}`, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById("loading").remove()
            const tweets = response.globalObjects.tweets
            const users = response.globalObjects.users
            const tweet_keys = Object.keys(tweets)
            const user_keys = Object.keys(users)
            if(tweet_keys.length === 0) {
                displayUser.innerHTML = "<h2>User not found!</h2>"
            } else {
                tweet_keys.forEach(key => arr.push(tweets[key].full_text))
                user_keys.forEach(key => usersArr.push(users[key].name))
                displayUser.innerHTML = `<h2>Username: ${usersArr[0]}`
            }
        })
        .then(() => {
            display_tweets.innerHTML = `${arr.map((item, index) => 
                `<li>${item} --<strong>${usersArr[index]}</strong></li>`).join('')}`
        })
        .then(() => {
            searchUser.value = ""
            tweet_input.value = ""
        })
        .catch(err => console.error(err));
    }
}

tweet_btn.onclick = handleTweet





