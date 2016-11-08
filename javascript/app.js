var model = {
    init: function() {
        this.cats = [
                        {
                            catName: "Andy",
                            imageUrl: "image/cat1.jpg",
                            clickCount: 0
                        },
                        {
                            catName: "Tom",
                            imageUrl: "image/cat2.jpg",
                            clickCount: 0
                        }
                    ];
         this.activeCat = null;
    }

};

var octopus = {
    init: function() {
        model.init();
        listView.init();
        imageView.init();
        adminView.init();
    },

    getCats: function() {
        return model.cats;
    },

    setActiveCat: function(catName) {
        model.activeCat = catName;
        imageView.render();
    },

    getActiveCat: function() {
        var allCats = model.cats;
        for(var i = 0; i < allCats.length; i++){
            if(allCats[i].catName === model.activeCat) {
               return allCats[i];
            }
        }

    },

    increaseClickCount: function() {
        var cat = this.getActiveCat();
        cat.clickCount = cat.clickCount + 1;
        imageView.render();
    },

    updateActiveCat: function(catName,catUrl,numOfClick) {
        var activeCat = this.getActiveCat();
        activeCat.catName = catName;
        activeCat.imageUrl = catUrl;
        activeCat.clickCount = numOfClick;
        model.activeCat = catName;

        listView.render();
        imageView.render();
        adminView.render();
    }
};


var listView = {
    init: function() {
        this.ul = document.getElementById('list-of-cat');
        listView.render();
    },

    render: function() {
        this.ul.innerHTML = "";
        var mycats = octopus.getCats();
        for(var i = 0; i < mycats.length; i++){
            var li = document.createElement('li');
            li.innerHTML = mycats[i].catName;
            this.ul.appendChild(li);
            li.addEventListener('click', function(i) {
                return function(){
                    octopus.setActiveCat(mycats[i].catName);
                }
            }(i));
        }
    }

};

var imageView = {
    init: function(){
        this.pName = document.getElementById('cat-name');
        this.p = document.getElementById('click-count-of-current-cat');
        this.img = document.getElementById('image-of-current-cat');
        this.img.addEventListener('click', function() {
            octopus.increaseClickCount();
        });
    },

    render: function() {
        var cat = octopus.getActiveCat();
        this.img.src = cat.imageUrl;
        this.p.innerHTML = cat.clickCount;
        this.pName.innerHTML = cat.catName;
        adminView.render();
    }

};

var adminView = {
    init: function() {
        //hide aminView on initialize
        this.adminPanel = document.getElementById('admin-panel');
        this.iCatName = document.getElementById('input-cat-name');
        this.iCatUrl = document.getElementById('input-cat-url');
        this.iNumOfClick = document.getElementById('input-num-of-click');
        this.btnAdmin = document.getElementById('admin-button');
        this.btnSave = document.getElementById('admin-save');
        this.btnClose = document.getElementById('admin-close');

        this.btnAdmin.addEventListener('click', function() {
            //show admin panel
            return function(){
                adminView.adminPanel.style.display = "block";
                adminView.render();
            };
        }(adminView));

        this.btnSave.addEventListener('click', function(iCatName,iCatUrl,iNumOfClick) {
            return function(){
                 //call octopus and save data to
                 octopus.updateActiveCat(iCatName.value,iCatUrl.value,iNumOfClick.value);
                  //call render to update the new value to view
            };

        }(this.iCatName,this.iCatUrl,this.iNumOfClick));

        this.btnClose.addEventListener('click', function(adminPanel) {
            //show admin panel
            return function(){
                adminPanel.style.display = "none";
            };
        }(this.adminPanel));

        this.adminPanel.style.display = "none";
    },

    render: function() {
        var activeCat = octopus.getActiveCat();
        this.iCatName.value = activeCat.catName;
        this.iCatUrl.value = activeCat.imageUrl;
        this.iNumOfClick.value = activeCat.clickCount;

    }

};

octopus.init();