function idGeneration(arr) {
    console.log("Received array for ID generation:", arr);

    if (!Array.isArray(arr)) {
        console.warn("Expected an array but got:", typeof arr);
        arr = [];
    }

    let id = 0;
    arr.forEach((el) => {
        if (el.id > id) {
            id = el.id;
        }
    });

    return id + 1;
}

module.exports= {idGeneration}