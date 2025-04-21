//sync-async.js
// Learn Asynchronous And Synchronous
/*
const asyncFunction = () => {
    setTimeout(() => {
        console.log("asyncFunction Started...");
    }, 3000);
};
console.log("Program Started...");
asyncFunction();
console.log("Program Finished !");
*/
/*
/ We have seen asyncFunction function has called at the last time.
/ Because Asynchronous never wait. it start line by line.
*/

console.log("Synchronous Started...")
const synchronousFunction = ()=>{
    setTimeout(() =>{
        console.log ("synchronousFunction Started...")
    }, 3000);
}
const results = async ()=>{
    await synchronousFunction()
}
results()
console.log("Synchronous Finished...")