let discordUrl = "https://discord.com/billing/partner-promotions/1180231712274387115/"
let redeem = document.getElementById('redeem')
const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.discord.gx.games/v1/direct-fulfillment'); // using a CORS proxy to bypass CORS

const generate = () => {
  let partnerUserId = generateRandomString(64); // generate a random SHA-256 hash to avoid detection

  fetch(`${url}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\"Opera GX\";v=\"105\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://www.opera.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `{\"partnerUserId\":\"${partnerUserId}\"}`,
    "method": "POST"
  })
  .then(response => {
    if (!response.ok) {
      console.error('Response status:', response.status);
      return response.text(); // or response.json() if expecting JSON
    }
    return response.json();
  })
  .then(data => {
    if (data) {
      console.log("Promo code: ", data.token);
      console.log("Redeem it here: ", discordUrl + data.token);
      redeem.textContent = discordUrl + data.token
    } else {
      console.error("Empty or unexpected response data");
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function sayhello() {
  console.log("hello")
}