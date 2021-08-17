//Task 1
// const fs = require('fs');
// const path = require('path');
//
// const dirPath1 = path.join(__dirname, '/1800');
// const dirPath2 = path.join(__dirname, '/2000');
//
// function readFirstDir(dirPath1, dirPath2){
//     fs.readdir(dirPath1, (err, files) => {
//         files.forEach(fileName => {
//             fs.readFile(path.join(dirPath1, fileName), ((err, data) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 const user = JSON.parse(data);
//                 if(user.gender === 'male'){
//                     fs.rename(path.join(dirPath1, fileName), path.join(dirPath2, fileName), err2 => {
//                         if (err2) {
//                              console.log(err2);
//                              return;
//                         }
//                     });
//                 }
//             }));
//         });
//     })
// }
// function readSecondDir(dirPath1, dirPath2){
//     fs.readdir(dirPath2, (err, files) => {
//         files.forEach(fileName => {
//             fs.readFile(path.join(dirPath2, fileName), ((err, data) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 const user = JSON.parse(data);
//                 if(user.gender === 'female'){
//                     fs.rename(path.join(dirPath2, fileName), path.join(dirPath1, fileName), err2 => {
//                         if (err2) {
//                             console.log(err2);
//                             return;
//                         }
//                     });
//                 }
//             }));
//         });
//     })
// }
//
// readFirstDir(dirPath1, dirPath2);
// readSecondDir(dirPath1, dirPath2);


// Task 2
// const fs = require('fs');
// const path = require('path');
//
// const dirPath = path.join(__dirname, 'Folder');
// const newDirPath = path.join(__dirname, 'New Folder');
// unpacking(dirPath, newDirPath);
//
// function unpacking(dirPath, newDirPath){
//     fs.readdir(dirPath, (err, files) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         files.forEach(file => {
//             fs.stat(path.join(dirPath, file), (err2, stats) => {
//                 if (err2) {
//                     console.log(err2);
//                     return;
//                 }
//                 if(stats.isDirectory()){
//                     unpacking(path.join(dirPath, file), newDirPath);
//                 } else{
//                     fs.rename(path.join(dirPath, file), path.join(newDirPath, file), err3 => {
//                         if(err3){
//                             console.log(err3);
//                             return;
//                         }
//                     })
//                 }
//             })
//         })
//     });
// }
