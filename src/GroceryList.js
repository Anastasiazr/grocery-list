import { Component } from 'react';
import cart from './cart.jpg'

export class GroceryList extends Component {
    state = {
    // Получаем доступ к тому, что пишет пользователь.
      userInput: '',
    // Поскольку все что пишет пользователь должно добавляться в общий список, вводим массив.
      groceryList: []
    }

    onChangeEvent(e) {
       //console.log(event.target.value);
       // Мы должны прописать реакцию на изменение userInput. Каждый раз когда происходит изменение, inputUser приравнивается к e(event). Именно event нужно писать в console log. Вместо event можно использовать любое слово, главное прописывать это слово везде, где сейчас стоит (e).
       this.setState({userInput: e})
       //console.log(e);
    }

    // Метод addItem создан для создания новых элементов. В нашем случае при клике (прописано внутри render). 
    // Вместо input можно указать другое. Внутри создаем переменную, которая будет отвечать за список, куда будут попадать все продукты.
    addItem(input) {
      if (input === '') {
        alert("Please, type someting.")
      } else{
     let listArray = this.state.groceryList;
     listArray.push(input);
     this.setState({groceryList: listArray, userInput: ''})
     console.log(listArray);

      }
    }

    deleteItem() {
      // Чтобы кнопка могла удалять элементы из списка получаем доступ к массиву, который содержит все элементы списка.
      let listArray = this.state.groceryList;
      // Далее даем команду опустошить массив.
      listArray = []
      // Либо listArray.length = 0;
      this.setState({groceryList:listArray})
    }

    crossedWord(event) {
      // Ставим подслушку на li. Вводим класс, в CSS пропишем перечеркивание элемента при клике, и обратный эффект с помощью toggle.
      const li = event.target;
      li.classList.toggle('crossed');
    }

    // Нужно предотвратить, чтобы страница перезагружалась, тогда кнопка ENTER начнеи функционировать.
    onFormSubmit(e) {
     e.preventDefault();
    }


    render() {
        return(
          <div>
            {/* Для того чтобы кнопка ENTER работала также как кнопка ADD, первое что нужно сделать, это обвернуть все, кроме основоного контейнера в тег <form></form> и прописать метод onFormSubmit */}
            <form onSubmit={this.onFormSubmit}>
            <div className="container">
                <input type="text"
                placeholder="What would you like to buy today?"
                // Атрибут onChange похожа на onClick. Используется, чтобы отслеживать, как меняется то, что пишет пользователь в input. Реакция на каждое изменение.
                onChange={(e) => {this.onChangeEvent(e.target.value)}}
                //Таким образом мы получаем доступ к значению (тому,что пишет пользователь) через состояние.
                value={this.state.userInput}/>
              </div>
              <div className="container"> 
                 <button onClick={() => this.addItem(this.state.userInput)} className="btn add">Add</button>
               </div>
              <ul>
                {this.state.groceryList.map((item,index) => (
                  // Применен метод map, чтобы получить доспуп не конкретно к списку в целом, а каждому отдельно взятому вводимому элементу. Далее указываем, что элементы будут выводится внутри тега <li></li>
                  <li onClick={this.crossedWord} key={index}>
                    <img src={cart} alt="shopping" width="20px"/>
                    {item}</li>
                ))}
              </ul>
              <div className="container"> 
                 <button onClick={() => this.deleteItem()} className="btn delete">Delete</button>
               </div>
               </form>
            </div>
        )
    }
}
