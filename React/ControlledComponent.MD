# 受控组件和非受控组件

## 场景

   * 1. 封装了一个Input 组件， 外部会传入一个value， 用户也可以自定义修改，我们会这么写：

```javascript
class Input extends Component {
    render() {
        return (<input 
            type="text"
            value={this.props.inputText}
    />);
    }
}
```

   * 2. 运行一下，展示没问题， 可是无法输入。。。 原因是因为当我们使用value属性的时候, 页面上展示的内容就由Input这个组件来管理了。

```javascript
 class Input extends Component {
     render() {
         return (<input 
             type="text"
             onChange={ (e) => {
                this.setState({inputText: e.target.value});
             }}
             value={this.state.inputText}
     />);
     }
 }

```

   * 3. ok! 可以输入了, 但是如果外部传入一个默认值怎么办呢? 继续:
    
```javascript
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: this.props.inputText || ''
    };
  }

  render() {
      return (<input 
          type="text"
          onChange={ (e) => {
             this.setState({inputText: e.target.value});
          }}
          value={this.state.inputText}
  />);
  }
}

```  

   * 4. 完美了!默认值也可以带进来了, 也可以支持用户输入了。可是... 如果外部在调用的时候开始传空的,后来又有值了怎么办呢?
   
```javascript
// 外部这样调用
class Parent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        
        setTimeout(() => {
            this.setState({value: '123'});
        }, 1000);
    }
    
    render() {
        return (<Input inputText={this.state.value}/>);
    }
}

```
   * 5. 惨了吧, 发现Input框没有值, 原因是什么呢, 后面再一次修改props 的inputText 的时候, Input组件不会再调用constructor方法了。改造:
    
```javascript

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: this.props.inputText || ''
    };
  }
  
  componentWillReceiveProps(nextProps) {
    //'inputText' in nextProps  
    if (nextProps && nextProps.inputText !== this.state.inputText) {
        this.setState({
            inputText: nextProps.inputText,
        });
        
        // TODO: 这里貌似也可以使用this.state.inputText = 'something'; 不会引起render方法执行。 
    }
  }

  render() {
      return (<input 
          type="text"
          onChange={ (e) => {
             this.setState({inputText: e.target.value});
          }}
          value={this.state.inputText}
  />);
  }
}

```

   * 6. 完美解决问题, 那么我们开始分析问题原因。
    
## 原因分析

   * React官网说明了Controlled Components & UnControlled Components <a href="https://facebook.github.io/react/docs/forms.html">原文</a>
   * 翻译过来就是受控组件和非受控组件, 一般来说我们推荐使用受控组件。
      * 为啥? 因为偶们想要这样控制。
   * 受控组件: 组件的表现形式(即状态)完全由组件来控制。 
   * 非受控组件: 其实是在底层实现时在其内部维护了一份自己的state, 这个state 对当前组件不开放。
   * 那什么时候用受控组件, 什么时候用非受控组件呢?
      * 其实他们可以互相切换的, 对于input 来说, 如果设置了value属性, 它就成为了一个受控组件, 否则就是非受控
      * 另外设置了value之后就需要监听onChange事件, 否则也会报错哦。
      * 如果前端不需要对用户输入的东西进行处理的话, 也不关心的话, 只设置一下defaultValue即可,或者这个都可以不要。
      * 针对我们既想要默认值,还想要修改,那就类似上面的做法。
        
    * 另外要注意一点, state, props 改变都会引起页面重新渲染, 所以在componentWillReceiveProps里面调用setState的时候要注意,不要引起死循环。
        

## 总结: Form, Select, Textarea, Input 这些组件在使用的时候一定要注意这些。当然推荐你们都用受控组件,毕竟掌控的感觉,真好。

## 多说一点
   * 平时我们项目中主要和redux连用, 有的时候会把input的值放到Redux的Store里面去,这个时候如果还要跟自己封装的组件连用的话,千万不要耦合到组件里面去。
   * 要么采用onChange 的回调形式,由父组件保存值, 或者为组件定义一个获取当前value的方法
    
```javascript

class Input extends Component {
    
  static propTypes = {
    onChangeHandler: PropTypes.func
  };  

  constructor(props) {
    super(props);
    this.state = {
        inputText: this.props.inputText || ''
    };
  }
  
  componentWillReceiveProps(nextProps) {
    //'inputText' in nextProps  
    if (nextProps && nextProps.inputText !== this.state.inputText) {
        this.setState({
            inputText: nextProps.inputText,
        });
        
        // TODO: 这里貌似也可以使用this.state.inputText = 'something'; 不会引起render方法执行。 
    }
  }

  render() {
      return (<input 
          type="text"
          onChange={ (e) => {
             this.setState({inputText: e.target.value});
             
             // 新增代码在这里~~~~~~~~~
             // OPTION1: 这里再执行以下外部传入的方法            
             this.props.onChangeHandler(this.state.inputText);
          }}
          value={this.state.inputText}
  />);
  }
  
   // 新增代码在这里~~~~~~~~~
    // OPTION2:
    
    getCurrentValue() {
        return this.state.value;
    }
  
}


// 父组件获取Component示例, 然后调用方法 getCurrentValue 即可

```     
       

* 差不多了,有问题联系我哈              

  
    

