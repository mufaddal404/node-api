const makeQuery = (obj, separator) => {
    let query = '';

    let swtch = false;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if(swtch){
                query += separator + prop + '=' + `"${obj[prop]}"`;
            }
            else{
                query += prop + '=' + `"${obj[prop]}"`;
                swtch = !swtch;
            }
        }
    }
    return query;
}

export default makeQuery;
