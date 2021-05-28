const textSum = {
    endPoint:
        'https://apis.sentient.io/microservices/nlp/textsummarisation/v0/getpredictions',
    key: function () {
        if (state.cliApiKey) {
            return state.cliApiKey;
        } else {
            return apikey;
        }
    },
    post: function (data) {
        return new Promise((resolve, reject) => {
            /** Return original input if the input text is less than 80 characters */
            const textStr = JSON.parse(data).text;
            if (textStr.length < 80) {
                resolve(textStr);
                return;
            }

            /** Create new XMLHttpRequest to make the API call */
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    const res = JSON.parse(this.responseText);
                    res.status === 'Failure' ? reject(res) : resolve(res);
                    console.log(res);
                }
            });

            xhr.open('POST', this.endPoint);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.setRequestHeader('x-api-key', this.key());
            xhr.send(data);
        });
    },
};
