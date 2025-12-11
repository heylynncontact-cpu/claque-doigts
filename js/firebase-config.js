const storage = {
    save: function(collection, id, data) {
        const key = collection + "_" + id;
        localStorage.setItem(key, JSON.stringify(data));
        const allKeys = JSON.parse(localStorage.getItem(collection + "_all") || "[]");
        if (!allKeys.includes(id)) {
            allKeys.push(id);
            localStorage.setItem(collection + "_all", JSON.stringify(allKeys));
        }
        return Promise.resolve(data);
    },
    
    get: function(collection, id) {
        const key = collection + "_" + id;
        const data = localStorage.getItem(key);
        return Promise.resolve(data ? JSON.parse(data) : null);
    },
    
    getAll: function(collection) {
        const allKeys = JSON.parse(localStorage.getItem(collection + "_all") || "[]");
        const results = [];
        allKeys.forEach(function(id) {
            const data = localStorage.getItem(collection + "_" + id);
            if (data) {
                results.push(JSON.parse(data));
            }
        });
        return Promise.resolve(results);
    },
    
    delete: function(collection, id) {
        const key = collection + "_" + id;
        localStorage.removeItem(key);
        const allKeys = JSON.parse(localStorage.getItem(collection + "_all") || "[]");
        const newKeys = allKeys.filter(function(k) { return k !== id; });
        localStorage.setItem(collection + "_all", JSON.stringify(newKeys));
        return Promise.resolve();
    },
    
    update: function(collection, id, data) {
        return this.save(collection, id, data);
    }
};
