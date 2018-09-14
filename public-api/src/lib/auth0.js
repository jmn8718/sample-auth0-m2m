const request = require('request-promise');
const {
  getToken,
  requestToAuth0
} = require('.')

class Auth0 {
  constructor() {
    this.token = undefined;
    this.tokenType = undefined;
    this.handleTokenData = this.handleTokenData.bind(this);
    this.requestToken = this.requestToken.bind(this);

    this.requestToken();
  }

  handleTokenData(tokenData) {
    const {
      access_token,
      token_type,
      expires_in
    } = tokenData;
    let requestTokenIn = (expires_in - 10) * 1000;
    this.accessToken = access_token;
    this.tokenType = token_type;
    this.tokenTimeout = setTimeout(() => {
      this.requestToken();
    }, requestTokenIn);
  }

  async requestToken() {
    let tokenData = await getToken();
    this.handleTokenData(tokenData);
  }

  async authorizedRequestToAuth0(url, method = 'GET', {
    headers = {},
    ...rest
  }) {
    return requestToAuth0(url, method, {
      headers: {
        ...headers,
        'Authorization': `${this.tokenType} ${this.accessToken}`
      },
      ...rest
    })
  }
}

const auth0 = new Auth0();

module.exports = auth0;