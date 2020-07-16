import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asroidId: '',
            randomIddata: [],
            isRandomData: false,
            Name: '',
            Nasa_jpl_url: '',
            is_potentially_hazardous_asteroid: false,
            isRandaomId: false,
        }
    }

    componentDidMount() {
        this.onSubmitRandom()
    }

    onSubmitRandom() {
        fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=B1tusN1HcfGE24zHXkZqqcr6xzpTbBUYy27gaohV')
            .then(respJson => respJson.json())
            .then(respJson => {
                console.log(JSON.stringify(respJson))
                this.setState({
                    randomIddata: respJson.near_earth_objects
                })

            })
            .catch(error => console.log(error))


    }


    render() {
        return (
            <View style={{marginTop: 20, alignItems: 'center'}}>

                <TextInput
                    value={this.state.asroidId}
                    onChangeText={(asroidId) => this.setState({asroidId})}
                    style={{
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        width: '90%',
                        height: 40
                    }}
                    placeholder={'Enter Astroid id'}></TextInput>
                {this.state.asroidId.length ?
                    <TouchableOpacity

                        style={{
                            alignItems: 'center',
                            borderWidth: 2,
                            borderRadius: 10,
                            marginTop: 20,
                            width: '50%',
                            height: 40,
                            backgroundColor: 'blue'
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white', marginTop: 5}}>Submit</Text>
                    </TouchableOpacity> :

                    <TouchableOpacity style={{
                        alignItems: 'center',
                        borderWidth: 2,
                        borderRadius: 10,
                        marginTop: 20,
                        width: '50%',
                        height: 40,
                        backgroundColor: 'gray'
                    }}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white', marginTop: 5}}>Submit</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={() => {
                        this.onSubmitRandom()
                        this.setState({isRandaomId: true})
                    }}
                    style={{
                        alignItems: 'center',
                        borderWidth: 2,
                        borderRadius: 10,
                        marginTop: 20,
                        width: '90%',
                        height: 40,
                        backgroundColor: 'blue'
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white', marginTop: 5}}>Random Astroid
                        Id</Text>
                </TouchableOpacity>
                {this.state.isRandaomId ?
                    this.state.isRandomData == false ?
                        <ScrollView style={{width: '90%'}}>

                            {this.state.randomIddata.map((item) =>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setState({
                                            isRandomData: true,
                                            Id: item.id,
                                            Name: item.name,
                                            Nasa_jpl_url: item.nasa_jpl_url,
                                            is_potentially_hazardous_asteroid: item.is_potentially_hazardous_asteroid
                                        })

                                    }

                                    style={{
                                        alignItems: 'center',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        marginTop: 20,
                                        height: 40,
                                        backgroundColor: 'aliceblue'
                                    }}>

                                    <Text style={{marginTop: 7}}>{item.id}</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                        :
                        <View style={{
                            alignItems: 'center',
                            borderWidth: 2,
                            borderRadius: 10,
                            marginTop: 20,
                            marginLeft: 5,
                        }}>
                            <Text style={{margin: 5, fontWeight: 'bold'}}>Name- {this.state.Name}</Text>
                            <Text style={{margin: 5, fontWeight: 'bold'}}>Nasa_jpl_url- {this.state.Nasa_jpl_url}</Text>
                            <Text style={{
                                margin: 5,
                                fontWeight: 'bold'
                            }}>is_potentially_hazardous_asteroid- {this.state.is_potentially_hazardous_asteroid}</Text>

                        </View>
                    :
                    null
                }


            </View>
        )
    }
}

export default App;
