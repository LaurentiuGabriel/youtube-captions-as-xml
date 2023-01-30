# Youtube Captions Downloader

A library for downloading captions from YouTube videos.

## Installation

To use this library in your project, run the following command:

```bash
npm i youtube-captions-as-xml
```

## Usage

```javascript
import YoutubeCaptionsDownloader from 'youtube-captions-as-xml';

const youtubeCaptions = new YoutubeCaptionsDownloader();

youtubeCaptions.getCaptionAsXml('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  .then(xml => {
    console.log(xml);
  })
  .catch(error => {
    console.error(error);
  });
```

## API

`getCaptionAsXml(youtubeLink: string)`
Fetches the captions of the video as XML.

### Arguments
- `youtubeLink`: The link of the YouTube video.

### Returns
- A promise that resolves to the captions in XML format.

### Errors
- `TooManyRequests`: If the request is blocked by a reCAPTCHA.
- `VideoUnavailable`: If the video is not available.
- `TranscriptsDisabled`: If the transcripts are disabled for the video.
- `NoTranscriptAvailable`: If no transcripts are available for the video.

## Known Issues

You may need to access the following url: https://cors-anywhere.herokuapp.com/ and request access to use this library. The reason is while testing from localhost, you may stumble upon the following error: <mark> 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. </mark> To fix this, access the aforementioned url and request for access, which is typically granted instantly. 


## License
This library is available under the MIT License.

## Contributing
If you find any bugs or have any suggestions for improvements, feel free to open an issue or a pull request.


