const tooth = document.querySelector(".tooth")



function hide(){
	tooth.style.visibility = 'hidden';
	setTimeout(show, 400);
}

function show(){
	tooth.style.left = Math.random() * 1000;
	tooth.style.right = Math.random() * 500;
	tooth.style.visibility = 'visible';
	setTimeout(hide, 1000);
}



//setInterval(show, 5000)
show()
