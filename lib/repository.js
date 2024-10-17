const { readFile, writeFile} = require("node:fs/promises");

class Repository {
    #dir
    constructor(dir) {
        this.#dir = dir;
    }
    
    async read(){
        let data = await readFile(this.#dir, "utf-8");

        if (data) {
            data = JSON.parse(data);

        }else{

            data = [];
        }
        return data;
    }

    async write(data){
        await writeFile(this.#dir, JSON.stringify(data, null, 4));
    }

}

module.exports = { Repository };

