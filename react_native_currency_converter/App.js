import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

const convertCurrency = () => {
  let value;
  if (fromCurrency === 'vnd') {
    value = currentCurrencyValue / 23000;
  } else {
    value = 23000 * currentCurrencyValue;
  }
  setConvertedValue(value);
};


setConversionCurrencies = (from, to) => {
  setToCurrency(to);
  setFromCurrency(from);
};

const ConversionTypeButton = ({from, to, setConversionCurrencies}) => {
  // const backgroundColor =
  //   props.fromCurrency === props.from && props.toCurrency === props.to
  //     ? 'lightblue'
  //     : null;
  // const buttonStyle = { backgroundColor: backgroundColor };

  const fromFlag = from === 'USD' ? '🇺🇸' : '🇻🇳';
  const toFlag = to === 'USD' ? '🇺🇸' : '🇻🇳';

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setConversionCurrencies(from, to)}
    >
      <Text style={styles.buttonText}>
        {fromFlag} to {toFlag}
      </Text>
    </TouchableOpacity>
  );
};


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, responseJ: {},
                  currentCurrencyValue: 0, toCurrency: 'usd', fromCurrency: 'vnd',
                conversionCurrencyValue: 0 };
  }

  componentDidMount() {
    const apiKey = "4d75d1ebea3085ef0b11097122692b0f";
    const query = this.props.fromCurrency + "," + this.props.toCurrency;
    const url =
      "http://www.apilayer.net/api/live&currencies=" +
      query +
      "?access_key=4d75d1ebea3085ef0b11097122692b0f";

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            responseJ: responseJson.quotes
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  convertCurrency = () => {
    this.setState({currentCurrencyValue: this.statecurrentCurrencyValue / 23000});
  };

  setFromCurrencyValue = (value) => {
    this.setState({currentCurrencyValue: value })
  }
  
  setConversionCurrencies = (from, to) => {
    if(from === 'USD')
      this.setState({conversionCurrencyValue: this.state.currentCurrencyValue * 23000 })
    if(from === 'VND')
      this.setState({conversionCurrencyValue: this.state.currentCurrencyValue / 23000 })
  }

  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.container}>
    //       <Text>Fetching currency</Text>
    //       <ActivityIndicator size='large'/>
    //     </View>
    //   )
    // }
    return (
      <View style={styles.container}>
        <Text>Please enter the value of the currency you want to convert</Text>
        <TextInput
          style={{
            height: 60,
            padding: 5,
            width: 300,
            fontSize: 35,
            borderWidth: 1,
            borderColor: "lightblue"
          }}
          keyboardType="numeric"
          autoFocus={true}
          textAlign="center"
          placeholder="100,000,000"
          selectionColor="red"
          onChangeText={this.setFromCurrencyValue}
        />
        <ConversionTypeButton from="VND" to="USD" setConversionCurrencies={this.setConversionCurrencies}/>
        <ConversionTypeButton from="USD" to="VND" setConversionCurrencies={this.setConversionCurrencies}/>
        <View>
          <Text>Current currency:</Text>
          <Text style={styles.currencyText}>{this.state.currentCurrencyValue || '0'}</Text>
          <Text>Conversion currenecy:</Text>
          <Text style={styles.currencyText}>{this.state.conversionCurrencyValue || '0'}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    borderColor: "lightblue",
    justifyContent: "center"
  },
  currencyText: {
    fontSize: 30,
    color: "green",
    fontWeight: "bold"
  }
});
