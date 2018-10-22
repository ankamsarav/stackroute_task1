var userId;

var getUserRepos = function(){
    userId = document.getElementById('userId').value;
    var url = `https://api.github.com/users/${userId}/repos`;
    
    getRepoList(url,(data)=>{generateList(data)});
}

var generateList = function(repo){
    var repoMarkUp = '',
        repoListWrapper = document.getElementById('repo-list');
    if(repo.length>0){
        repo.map((data)=>{return repoMarkUp += `<li>${data.name}<button data-=''>New issue</button></li>`});
        repoListWrapper.innerHTML = repoMarkUp;
    }
    else{
        repoListWrapper.innerHTML = `<li>Sorry, <span class='red'>${userId}</span> does not exist</li>`;
    }
}

var getRepoList = function(url,callback){
   return fetch(url)
   .then(response => response.json()
   .then((data)=>{callback(data)})).catch(function(error) {
    console.log(error);
  });
}