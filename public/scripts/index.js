(function(){
    var userId, createIssueParam,
    issueForm = document.querySelector('.issue-form-wrapper'),
    createIssueFormBtn = document.querySelector('.issue-form-wrapper .create'),
    cancelIssueFormBtn = document.querySelector('.issue-form-wrapper .cancel'),
    usernameSubmitBtn = document.querySelector('.user-form-wrapper .submit-button'),
    issueDescription = document.querySelector('#issueDescription'),
    issueTitle = document.querySelector('#issueTitle'),
    accessToken = '2faa33d2b933ddbbcefd4d1fe1a17ed5c4a3f134';

    var init = function(){
        usernameSubmitBtn.addEventListener('click',getUserRepos);
    }

    var getUserRepos = function(){
        userId = document.getElementById('userId').value;
        var url = `https://api.github.com/users/${userId}/repos`;
        
        getRepoList(url,(data)=>{generateList(data)});
        document.getElementById('userId').value = '';
    }

    var addEventsToIssuesBtn = function(){
        const repolist = document.querySelector('#repo-list');
        repolist.addEventListener('click', (e) => {
            if(e.target.name = 'newIssue'){
                showIssueForm(e)
            }
        });
    }

    var generateList = function(repo){
        var repoMarkUp = '',
            repoListWrapper = document.getElementById('repo-list');
        if(repo.length>0){
            repo.map((data)=>{return repoMarkUp += `<li><span class='repo-name'>${data.name}</span><button data-repourl='${data.url}' name='newIssue'>New issue</button></li>`});
            repoListWrapper.innerHTML = repoMarkUp;
            addEventsToIssuesBtn();
        }
        else{
            repoListWrapper.innerHTML = `<li>Sorry, <span class='red'>${userId}</span> does not exist</li>`;
        }
    }

    var getRepoList = (url,callback)=> fetch(url).then(response => response.json().then((data)=>{callback(data)}))
        .catch(error => console.log(error));

    var createIssuePayLoad = function(issueTitle, issueDescription){
        var payLoad = {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.symmetra-preview+json'
            },
            body: JSON.stringify({
                "title": issueTitle,
                "body": issueDescription
            })
        }
        return payLoad;
    }
    var showIssueForm = function(e){      
        issueForm.classList.add('show');
        createIssueFormBtn.addEventListener('click', (e)=>{ e.preventDefault(); createIssue()});
        cancelIssueFormBtn.addEventListener('click',hideIssueForm);
        createIssueParam = {
            URL: e.target.dataset.repourl        
        }
    }

    var hideIssueForm = function(e){
        e.preventDefault();
        issueForm.classList.remove('show');
        e.stopImmediatePropagation();
    }

    var createIssue = function(){
        createIssueParam.issueDescription = issueDescription.value;
        createIssueParam.issueTitle = issueTitle.value;
        var payload = createIssuePayLoad(createIssueParam.issueDescription, createIssueParam.issueTitle);
        fetch(createIssueParam.URL+'/issues?&access_token='+accessToken,payload)
        .then(response => response.json())
        .then(data=>console.log(data)).catch(function(error) {
            console.log(error);
        });
        issueForm.classList.remove('show');
        issueDescription.value = '';
        issueTitle.value = '';
    }
    init();
})();