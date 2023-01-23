export class YoutubeCaptionsAsXml {
  // Extracts the video id from the given youtube url
  extractVideoId = (url) => {
    const regex = /watch\?v=(\w{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Extracts the captions JSON from the HTML of the video page
  _extractCaptionsJson = (html, videoId) => {
    const splittedHtml = html.split('"captions":');

    // Check for too many requests
    if (splittedHtml.length <= 1) {
      if (html.includes('class="g-recaptcha"')) {
        throw new Error(`TooManyRequests: ${videoId}`);
      }
      // Check for video availability
      if (!html.includes('"playabilityStatus":')) {
        throw new Error(`VideoUnavailable: ${videoId}`);
      }
      // Check for transcripts availability
      throw new Error(`TranscriptsDisabled: ${videoId}`);
    }

    // Extract the captions JSON
    const captionsJson = JSON.parse(
      splittedHtml[1]
        .split(',"videoDetails')[0]
        .replace(/\n/g, '')
    ).playerCaptionsTracklistRenderer;

    // Check for transcripts availability
    if (!captionsJson) {
      throw new Error(`TranscriptsDisabled: ${videoId}`);
    }

    // Check for the presence of caption tracks
    if (!captionsJson.captionTracks) {
      throw new Error(`NoTranscriptAvailable: ${videoId}`);
    }

    return captionsJson;
  }

  // Fetches the captions of the video as XML
  getCaptionAsXml = async (youtubeLink) => {
    var youtubeId = this.extractVideoId(youtubeLink)
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://www.youtube.com/watch?v=' + youtubeId;
    return fetch(proxyUrl + targetUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        const link = this._extractCaptionsJson(data.toString(), youtubeId)
        return fetch(link.captionTracks[0].baseUrl)
          .then(response => response.text())
          .then(data => {
            return data
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default YoutubeCaptionsAsXml;