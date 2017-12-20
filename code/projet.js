/* SLIDER */
var slider = {
  get index() {
    return this._index;
  },

  set index(v) {
    var length = this.elements.length;
    this._index = v >= length ? 0 : (v < 0 ? length - 1 : v);

    this.each(function(element, index) {
      element.style.display = this.index == index ? 'block' : 'none';
    });

    zoom.src = this.src;
  },

  get elements() {
    return document.querySelectorAll('.mySlides');
  },

  get element() {
    return this.elements[this.index];
  },

  get src() {
    return this.element.querySelector('img').src;
  },

  each: function(callback) {
    var elements = this.elements;
    for(var i = 0; i < elements.length; i++) callback.call(this, elements[i], i);
  },

  init: function() {
    this.index = 0;
  }
};

var zoom = {
  element: document.querySelector('.zoom'),
  image: document.querySelector('.zoom img'),

  get src() {
    return this.image.src;
  },

  set src(v) {
    this.image.src = v;
  },

  get width() {
    return this.image.offsetWidth - this.element.offsetWidth;
  },

  get height() {
    return this.image.offsetHeight - this.element.offsetHeight;
  },

  get top() {
    return parseFloat(this.image.style.top);
  },

  set top(v) {
    return this.image.style.top = v + 'px';
  },

  get left() {
    return parseFloat(this.image.style.left);
  },

  set left(v) {
    return this.image.style.left = v + 'px';
  },

  set visible(v) {
    this.image.style.display = v ? 'block' : 'none';
  },

  set position(v) {
    this.image.style.transform = 'translate(' + (this.limit(v.x)*100) + '%, ' + (this.limit(v.y)*100) + '%)'
  },

  limit: function(coordinate) {
    return coordinate;
    return coordinate < 0 ? 0 : (coordinate > 1 ? 1 : coordinate);
  },

  init: function() {
    var self = this;

    slider.each(function(element) {
      var image = element.querySelector('img');

      image.addEventListener('mouseover', function() {
        self.visible = true;
      });

      image.addEventListener('mouseout', function() {
        self.visible = false;
      });

      image.addEventListener('mousemove', function(event) {
        var offset = $(image).offset();

        console.log(
          (0.5 - (event.clientX - offset.left)/image.offsetWidth)*self.width,
          (0.5 - (event.clientY - offset.top)/image.offsetHeight)*self.height
        );

        self.left = (-(event.clientX - offset.left)/image.offsetWidth)*self.width;
        self.top = (-(event.clientY - offset.top)/image.offsetHeight)*self.height;
      });
    });
  },

  parse: function(translation) {
    return translation.replace(/translate/)
  }
};

window.addEventListener('load', function() {
  slider.init();
  zoom.init();
});
