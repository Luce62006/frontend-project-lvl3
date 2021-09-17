fetch(url)
    .then(response => {
        return response.json().then(data => {
            if (response.ok) {
                return data;
            } else {
                return Promise.reject({status: response.status, data});
            }
        });
    })
    .then(result => console.log('success:', result))
    .catch(error => console.log('недоступный URL:', error));