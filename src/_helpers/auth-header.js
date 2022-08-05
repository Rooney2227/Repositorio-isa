export function authHeader() {
    // return authorization header with jwt token
   let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {  
                'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Content-Type': 'application/json'
             //   'Authorization': 'Bearer ' + user.token 
            
            }
    } else {
        return {};
    } 
}
export function authHeader_img() {
    // return authorization header with jwt token
 //   let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {  
                'Authorization': 'Bearer ' + user.token }
    } else {
        return {};
    } 
}



export function authHeader_get (){
    return  {method: 'GET',headers: {'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    'Content-Type': 'application/json'}};
}

export function authheader_post (json){
    return  {
        method: 'POST',
        headers: {'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    };
}

export function autheaer_post_img(json){
    return  {
        method: 'POST',
        headers: authHeader_img(),
        body: json
    };
}