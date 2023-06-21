function cards() {
    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.desc = desc;
          this.price = price;
          this.classes = classes;
          this.parent = document.querySelector(parentSelector);
          this.transfer = 462;
          this.convertCurrency();
        }
    
        convertCurrency() {
          this.price = this.transfer * this.price;
        }
    
        render() {
          const element = document.createElement('div');
          
          if (this.classes.length === 0) {
              this.element = 'menu__item';
              element.classList.add(this.element);
          } else {
              this.classes.forEach(className => {element.classList.add(className)});
          }
    
          element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> тг/день</div>
            </div>
          `;
          this.parent.append(element);
        }
      }
    
      const getResource = async (url) => {
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
      }
    
      getResource("http://localhost:3000/menu")
        .then(data => {
          data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render()
          });
        });
}

export default cards;