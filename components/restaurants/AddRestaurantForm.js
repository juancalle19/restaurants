import React , {useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function AddRestaurantForm({toastRef , setLoading , navigation}) {
    const addRestaurant = () => {
        console.log("yeah")
    }

    return (
        <View style = {styles.vieContainer}>
            <FormAdd/>
            <Button
                title = "Crear Restaurante"
                onPress = {addRestaurant}
                buttonStyle = {styles.btnAddRestaurant}
            />
        </View>
    )
}

function FormAdd() {
    const [country, setCoutry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    return(
        <View style = {styles.viewForm}>
            <Input
                placeholder = "Nombre del restaurante"
            />
            <Input
                placeholder = "Direccion del Restaurante"
            />
            <Input
                keyboardType = "email-address"
                placeholder = "Email del restaurante"
            />
            <View style = {styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle = {styles.countryPicker}
                    countryCode = {country}
                    onSelect = {(country) => {
                        setCoutry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder = "Whatsapp del restaurante"
                    keyboardType = "phone-pad"
                    containerStyle = {styles.inputPhone}
                />
            </View>
            <Input
                placeholder = "Descripcion del restaurante"
                multiline
                containerStyle = {styles.textArea}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    vieContainer: {
        height: "100%"
    },
    viewForm:{
        marginHorizontal: 10
    },
    textArea:{
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone:{
        width: "80%"
    },
    btnAddRestaurant:{
        margin: 20,
        backgroundColor: "#442484"
    }
})
