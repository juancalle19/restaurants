import React , {useState}from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { Avatar, Button, Icon, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { ScrollView , Alert} from 'react-native'
import {map , size , filter } from 'lodash'

import { loadImageFromGalery } from '../../utils/helpers'


export default function AddRestaurantForm({toastRef , setLoading , navigation}) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const addRestaurant = () => {
        console.log(formData)
        console.log("yeah")
    }

    return (
        <View style = {styles.vieContainer}>
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorPhone={errorPhone}
                errorAddress={errorAddress}
            />
            <UploadImage
                toastRef ={toastRef}
                imagesSelected = {imagesSelected}
                setImagesSelected ={setImagesSelected}

            />
            <Button
                title = "Crear Restaurante"
                onPress = {addRestaurant}
                buttonStyle = {styles.btnAddRestaurant}
            />
        </View>
    )
}

function UploadImage({toastRef,imagesSelected, setImagesSelected}) {
    const imageSelect =async() =>{
        const response  = await loadImageFromGalery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen." , 3000)
            return
        }
        setImagesSelected([...imagesSelected , response.image])
    }

    const removeImage = (image)=>{
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas Seguro?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Si",
                    onPress: ()=>{
                        setImagesSelected(
                            filter(imagesSelected,(imageUrl)=>imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }
    return(
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 &&(
                    <Icon
                        type ="material-community"
                        name= "camera"
                        color= "#7a7a7a"
                        containerStyle = {styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected,(imageRestaurant , index)=>(
                    <Avatar
                        key ={index}
                        style = {styles.miniatureStyle}
                        source={{uri:imageRestaurant}}
                        onPress = {()=>removeImage(imageRestaurant)}
                    />
                ))
            }

        </ScrollView>
    )
}

function FormAdd({formData , setFormData,errorName,errorDescription,errorEmail,errorPhone,errorAddress}) {
    const [country, setCoutry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e,type) => {
        setFormData({...formData, [type] : e.nativeEvent.text})
    }

    return(
        <View style = {styles.viewForm}>
            <Input
                placeholder = "Nombre del restaurante"
                defaultValue={formData.name}
                onChange={(e)=>onChange(e, "name")}
                errorMessage= {errorName}
            />
            <Input
                placeholder = "Direccion del Restaurante"
                defaultValue={formData.address}
                onChange={(e)=>onChange(e, "address")}
                errorMessage= {errorAddress}
            />
            <Input
                keyboardType = "email-address"
                placeholder = "Email del restaurante"
                defaultValue={formData.email}
                onChange={(e)=>onChange(e, "email")}
                errorMessage= {errorEmail}
            />
            <View style = {styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle = {styles.countryPicker}
                    countryCode = {formData.country}
                    onSelect = {(country) => {
                        setFormData({...formData,"country" : country.cca2, "callingCode": country.callingCode[0]})
                        
                    }}
                />
                <Input
                    placeholder = "Whatsapp del restaurante"
                    keyboardType = "phone-pad"
                    containerStyle = {styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e)=>onChange(e, "phone")}
                    errorMessage= {errorPhone}
                />
            </View>
            <Input
                placeholder = "Descripcion del restaurante"
                multiline
                containerStyle = {styles.textArea}
                defaultValue={formData.description}
                onChange={(e)=>onChange(e, "description")}
                errorMessage= {errorDescription}
            />

        </View>
    )
}

const defaultFormValues = () =>{
    return{
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        country:"CO",
        callingCode: "57"
    }
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
    },
    viewImages:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10
    },
    containerIcon:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 10
    }
})
