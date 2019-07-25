const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value;

    msg1.textContent = 'Locatin Loading ...';
    msg2.textContent = '';
    msg3.textContent = '';
    const lcurl = 'http://localhost:3000/weather?address=' + encodeURI(location);
    const located = fetch(lcurl).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg3.textContent = data.error;
            }
            msg1.textContent = data.location;
            msg2.textContent = data.forcasedata;
        })
    })
})
