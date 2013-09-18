

/* The basic control-flow we want works something like this:

                  document.ready?
                         |
                  message into DOM
                    < 3 forks >
        /                |            \
simpleTimer        XHR Operation        basicValue
                         |
                find article header
                         |
                    insert to DOM
        \                |            /
    when all 3 finished, write final DOM message


This won't actually have many nested callbacks, as some other examples might. But how do you know when all three simultaneous operations are complete, without creating a whole messaging system, or creating an interval-based status checker?
Among other things, promises *are* a messaging system. 
*/

// Code-Quality note: for demo purposes, we're doing obtrusive javascript,
// and letting all our promises hang out as globals. 


/*  SOME UTILITY FUNCTIONS WE'LL USE IN OUR CODE, BUT DON'T HAVE TO WRITE  */
function timeoutCallback() {
    // we'll use this as the handler for our non-Promise Timeouts
    alert('timeout reached');
};
function valueLogger(value) {
    // handler to show us the values we get back from async functions
    console.log(value);
}
function errorLogger(XHR) {
    networkError = Q(XHR).inspect();
    console.log("Network operation failed. Error follows:")
    console.log(XHR.error());
}
function writeToDOM() {
    $('#insertedContent').append("<h2 class='text-info'>This wouldn't exist if docPromise hadn't resolved already...</h2>")
}
function writeToDOMAgain() {
    $('#insertedContent').append("<h3 class='text-success'>And <em>this</em> wouldn't exist if all promises on the whole page hadn't resolved!</h3>")   
}

/*  THE FUNCTIONS THAT SUPPORT OUR DEMO BUTTONS */
function createDeferred() {
    sampleDeferred = Q.defer();
    samplePromise = sampleDeferred.promise;
    console.log('Deferred and its promise: created!')
}

function inspectDeferred() {
    console.log(samplePromise.inspect());
}

function isDeferredResolved() {
    console.log(samplePromise.isFulfilled());
}

function addHandlerToDeferred() {
    samplePromise.then(valueLogger, valueLogger);
}

function resolveDeferred() {
    sampleDeferred.resolve("You gotta' get a value back!");
}
function rejectDeferred() {
    sampleDeferred.reject("Rejections require a reason!")
}
function delayOld(ms) {
    // old-fashioned style callback-based timout.
    window.setTimeout(timeoutCallback, ms);
};

/*  STUFF FOR YOU TO IMPLEMENT */
function delayNew(ms) {
    // the new, Promises-based version of a simple setTimeout.
    // Starts the timer, establishes callback handler for timer, then returns a promise right away. 

    // This message will be the value our Promise is resolved with:
    var delayMessage = 'Delay Resolved after ' + ms + ' milliseconds.';

    // Your code follows...
    // IMPLEMENT #1
    





}

function simpleWrapper(value) {
    // Creating Promises for simple values or synchronous function output

    // We just wrap the basic value and immediately return the resolved promise.
    // IMPLEMENT #2
    
}

function chainSimplePromise(value) {
    // Make a promise using our wrapper function, then look at what's inside. 
    // IMPLEMENT #3

}

function stripOutMainContent(wholePage) {
    // First we perform some basic DOM stuff to get the content:
    var content = $(wholePage).find('section').html()
    // But now, we need to wrap this content in a promise, so we can continue a chain... 
    // IMPLEMENT #11
    
}

function writeArticleToDOM(articleText) {
    $('article').html(articleText);
    // and, just as good form, return a promise to the end of the chain, containing articleText, so we can see the output:
    // IMPLEMENT #12
    
}

function doMoreStuff() {
    // we're going to wait for the document.ready promise to resolve. 
    // We're going to immediately create three new promises, and an aggregate promise based on them. 


    // NETWORK OPERATION
    xhrPromise = $.ajax({ url: 'http://www.html5rocks.com/en/tutorials/file/xhr2/' }).promise();
    // Now, take that promise, stripOutMainContent and then writeArticleToDOM
    // NOTE: stripOutMainContent still needs to be implemented!!!
    // (Wat? JQuery promises are weird... What do we do?)
    // IMPLEMENT #9
    // compoundXHR = 

    // Now, because this is a network operation, it can fail for all kinds of reasons. 
    // Handle errors with the provided 'errorLogger' function. 
    // IMPLEMENT #10

    // NETWORK OPERATION ENDS


    // SIMPLE VALUE PROMISE
    // create a simple value-based promise using function we already created, and this text:
    var simpleValue = 'I bet this promise resolved first among the three...';
    // IMPLEMENT
    // simplePromise = 
    // Now, access this promise and just log the content:
    // IMPLEMENT #6

    // SIMPLE VALUE PROMISE ENDS


    // TIMEOUT PROMISE
    // Create a new promise based on a Timeout of 2500ms, using our promise-generating delayNew Function;
    // IMPLEMENT #7
    // delayPromise = 
    /* ( Side-note: Alternately, we could actually use Q's convenience method for timeouts, which returns a promise:
            ex.: delayPromise = Q.delay(2500) ) */

    // Now, access this delayPromise and just log the content:
    // IMPLEMENT #8

    // TIMEOUT PROMISE ENDS


    // FINAL HANDLER FOR ALL THREE OF THOSE PROMISES ABOVE
    // The .all() method returns a new, aggregated, promise. 
    // It's resolved when an entire array of promises are each resolved.
    // We want an aggregate promise composed of simplePromise, compoundXHR & delayPromise
        // Then, log that promise
        // Then, run writeToDOMAgain
    // IMPLEMENT #13 (depends on #11-#12)

}


// Create a deferred and a promise (We'll use them to represent the state of the document's 'ready' event.)
// IMPLEMENT
// docDeferred =
// IMPLEMENT 
// docPromise = 
$('document').ready(function(){
    // console.log('Doc Ready. No other functions ready yet.') // disable me when more interesting things are happening
    var readyMessage = 'Document is ready now. Go Ahead and do more promise stuff!';
    // This is where you should resolve the docPromise, with the message above...
    // IMPLEMENT #4

}) 
// Create handlers for the docPromise that:
// 1. Just shows its value
// 2. Uses the 'writeToDOM' function to print it out
// 3. continues our control-flow with doMoreStuff !

// IMPLEMENT #5


