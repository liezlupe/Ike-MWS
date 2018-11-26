if(navigator.serviceWorker){
    navigator.serviceWorker.register(`../sw.js`).then(reg => {
        console.log(`Service worker terdaftar, berada di ${reg.scope}`);
    }).catch(err => {
        console.log(`Service worker gagal di daftarkan, error: ${err}`);
    });
}
