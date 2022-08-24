const puppeteer = require('puppeteer');
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "amish.kumar1211@gmail.com";
const password = "Am@311203";
const answerArr = require('./hk_answer');
const browserOpen = puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
})

let page;

browserOpen.then(function(browser){

    return browser.newPage();
  
}).then(function(newTab){
    page = newTab;
    return page.goto(loginLink);
}).then(function (){
    return page.waitForSelector("#input-1",{visible:true});
}).then(function(){
    return page.type("#input-1",email,{delay:50});
}).then(function(){
    return page.type("#input-2",password,{dealy:50 });
}).then(function(){
    return page.waitForSelector(".auth-box .ui-btn-large",{visible:true});
}).then(function(){
    return page.click(".auth-box .ui-btn-large",{delay:50});
}).then(function(){
    return waitAndClick("[data-automation='algorithms']",page);
}).then(function(){
    return waitAndClick("[value='warmup']",page);
}).then(function(){
    return page.waitForTimeout(3000);
}).then(function(){
    return page.$$(".ui-btn.ui-btn-styled");
}).then(function(questionArr){
    console.log(questionArr.length);
    questionSolver(page,questionArr[0],answerArr[0]);
})
.catch(function(err){
    console.log(err);
})

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        const waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            const clickModal = cPage.click(selector,{delay:50});
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

function questionSolver(page,question, answer){
    return new Promise(function(resolve,reject){
        const questionWillBeClicked = question.click();
        questionWillBeClicked.then(function(){
            return waitAndClick('.hr-monaco-base-editor',page);
        }).then(function(){
            return waitAndClick('.checkbox-wrap',page);
        }).then(function(){
            return page.waitForSelector('#input-1');
        }).then(function(){
            return page.type("#input-1",answer);
        })
        .then(function(){
            return page.keyboard.down('Control');
        }).then(function(){
            return page.keyboard.press('A',{delay:10});
        }).then(function(){
            return page.keyboard.press('X',{delay:10});
        }).then(function(){
            return page.keyboard.up('Control');
        }).then(function(){
            return waitAndClick('.hr-monaco-base-editor',page);
        }).then(function(){
            return page.keyboard.down('Control');
        }).then(function(){
            return page.keyboard.press('A',{delay:10});
        }).then(function(){
            return page.keyboard.press('V',{delay:10});
        }).then(function(){
            return waitAndClick('.hr-monaco-submit',page);
        }).then(function(){
            resolve()
        }).catch(function(){
            reject();
        })       
    })
}