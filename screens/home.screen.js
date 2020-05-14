import React from "react";

import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';



import {Text, View, ScrollView, ToastAndroid, Image} from "react-native";
import {
    Appbar,
    Button,
    TextInput,
    Divider,
    Checkbox,
    HelperText,
    Card,
    Title,
    Paragraph,
    RadioButton,
    Drawer,
    Chip,
    List
} from 'react-native-paper';


import DatePicker from 'react-native-datepicker'
import {AsyncStorage, FlatList} from 'react-native';
import axios from 'axios';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {isLogged} from "./authCheck";
import * as config from "../api/config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {setDisabled} from "react-native/Libraries/LogBox/Data/LogBoxData";

function HomeScreen({route, navigation}) {

    const [userRole, setUserRole] = React.useState("LOADING");

    /*
    React.useEffect(async () => {
        console.log("HOME USE EFFECT");

            const logged = await isLogged();
            console.log(logged);
            if(logged === "") {
                navigation.navigate('Authentication')
            } else {
                console.log("LOGGED", logged);
                setUserRole(logged)
            }
            console.log("LOG", logged)


    }, []);
     */

    React.useEffect(() => {

        if (route.params) {
            const {roles} = route.params
            console.log(roles);
            setUserRole(roles)
        } else {
            navigation.navigate('Authentication')
        }

    });

    const Tab = createBottomTabNavigator();

    const offresData = [
        {
            "id": 1,
            "name": "Développeur PHP",
            "description": "Nous recherchons un développeur PHP avec au moins 3 ans d'expérience.",
            "companyDescription": "Bonne ambiance.",
            "startAt": "2020-05-13T09:58:30+00:00",
            "workingPlace": "Paris"
        },
        {
            "id": 2,
            "name": "Développeur JS",
            "description": "Nous recherchons un développeur JS avec au moins 5 ans d'expérience.",
            "companyDescription": "Bonne ambiance.",
            "startAt": "2020-05-13T09:58:30+00:00",
            "workingPlace": "Rouen"
        },
        {
            "id": 3,
            "name": "Développeur C#",
            "description": "Nous recherchons un développeur C# avec au moins 10 ans d'expérience.",
            "companyDescription": "Bonne ambiance.",
            "startAt": "2020-05-13T09:58:30+00:00",
            "workingPlace": "Nancy"
        }
    ];


    function Item({ name,  applies}) {
        return (
            <View style={{margin: 15, padding: 10}}>

            <List.Item
                title={name}
            />
            <Button icon={"message"} mode="contained" onPress={() => {navigation.navigate('OfferApplies', {offerApplies: applies})}}>Voir les candidats</Button>
            </View>
        );
    }


    function Recruteur() {
        return <Tab.Navigator>
            <Tab.Screen name="Ajouter une offre" component={HomeRecruteurScreen}
                        options={{
                            tabBarLabel: 'Ajouter mon offre',
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="book" color={color} size={size}/>
                            ),
                        }}
            />
            <Tab.Screen name="Mes offres" component={RecruteurOfferScreen}
                        options={{
                            tabBarLabel: 'Mes offres',
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="view-compact" color={color} size={size}/>
                            ),
                        }}/>
        </Tab.Navigator>
    }

    function HomeRecruteurScreen() {

        const [name, onNameChange] = React.useState("");
        const [nameError, onNameChangeError] = React.useState(false);
        const [nameErrorMsg, onNameChangeErrorMsg] = React.useState("");

        const [description, onDescriptionChange] = React.useState("");
        const [descriptionError, onDescriptionError] = React.useState(false);
        const [descriptionErrorMsg, onDescriptionChangeErrorMsg] = React.useState("");


        const [descriptionCompany, onDescriptionCompanyChange] = React.useState("");
        const [descriptionCompanyError, onDescriptionCompanyError] = React.useState(false);
        const [descriptionCompanyErrorMsg, onDescriptionCompanyChangeErrorMsg] = React.useState("");


        const [startAt, onStartAtChange] = React.useState(today());
        const [startAtError, onstartAtError] = React.useState(false);
        const [startAtErrorMsg, onstartAtErrorMsg] = React.useState("");

        const [workingPlace, onWorkingPlaceChange] = React.useState("");
        const [workingPlaceError, onWorkingPlaceError] = React.useState(false);
        const [workingPlaceErrorErrorMsg, onWorkingPlaceErrorChangeErrorMsg] = React.useState("");

        const [contract, onChangeContract] = React.useState("");
        const [contractError, onChangeContractError] = React.useState(false);
        const [contractErrorMsg, onChangeContractErrorMsg] = React.useState("");

        const [btnDisabled, onSetBtnDisabled] = React.useState(false);

        const [date, setDate] = React.useState(today())


        function today() {
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            return today = yyyy + '-' + mm + '-' + dd;

        }

        const onSubmit = async () => {
            onSetBtnDisabled(true);

            const payload = {
                name: name,
                description: description,
                companyDescription: descriptionCompany,
                startAt: startAt,
                workingPlace: workingPlace,
                contract: contract
            };

            let isReady = true;

            if (!payload.name || payload.name.trim() === "") {
                onNameChangeError(true);
                onNameChangeErrorMsg("Nom invalide")
                isReady = false;
            } else {
                onNameChangeError(false);
                onNameChangeErrorMsg("")
            }

            if (!payload.description || payload.description.trim() === "") {
                onDescriptionError(true);
                onDescriptionChangeErrorMsg("Description offre invalide")
                isReady = false;
            } else {
                onDescriptionError(false);
                onDescriptionChangeErrorMsg("")
            }

            if (!payload.companyDescription || payload.companyDescription.trim() === "") {
                onDescriptionCompanyError(true);
                onDescriptionCompanyChangeErrorMsg("Description entreprise invalide")
                isReady = false;
            } else {
                onDescriptionError(false);
                onDescriptionCompanyChangeErrorMsg("")
            }

            if (!payload.contract || payload.contract.trim() === "") {
                onChangeContractError(true);
                onChangeContractErrorMsg("Type de contrat invalide")
                isReady = false;
            } else {
                onChangeContractError(false);
                onChangeContractErrorMsg("")
            }

            if (!payload.workingPlace || payload.workingPlace.trim() === "") {
                onWorkingPlaceError(true);
                onWorkingPlaceErrorChangeErrorMsg("Lieu de travail invalide")
                isReady = false;
            } else {
                onWorkingPlaceError(false);
                onWorkingPlaceErrorChangeErrorMsg("")
            }

            if (isReady === false) {
                onSetBtnDisabled(false) // release
            } else {

                try {
                    const t = await AsyncStorage.getItem('jwt');
                    if (t === null) {
                        navigation.navigate('Acceuil')
                    } else {
                        const me = await axios.post(`${config.default.URL}/me`, {token: t});

                        if (me.status === 200 || me.status === 201) {
                            const id = me.data[5].id;

                            payload["user"] = "/users/" + id; // IRI

                            const resp = await axios.post(`${config.default.URL}/offres`, payload, {
                                headers: {
                                    'Authorization': `Bearer ${t}`,
                                    'Content-type': 'application/json'
                                }
                            });

                            if (resp.status === 200 || resp.status === 201) {
                                onSetBtnDisabled(false); // release
                                navigation.navigate('Invitations', {
                                    offreIdTargetIRI: resp.data["@id"],
                                    userRole: userRole
                                });
                            } else {
                                onSetBtnDisabled(false); // release
                                ToastAndroid.showWithGravity(
                                    "Erreur réseaux, veuillez réessayer",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                );
                            }
                        } else {
                            onSetBtnDisabled(false); // release
                            ToastAndroid.showWithGravity(
                                "Erreur réseaux, veuillez réessayer",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }
                    }
                } catch (e) {
                    onSetBtnDisabled(false); // release
                    ToastAndroid.showWithGravity(
                        "Erreur réseaux, veuillez réessayer",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }


        };

        return (
            <ScrollView>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => {
                        navigation.openDrawer()
                    }}/>

                    <Appbar.Content
                        title="Recruiter"
                        subtitle="L'application pour les recruteurs !"
                    />
                </Appbar.Header>
                <ScrollView>
                    <Card style={{paddingTop: 15, margin: 30}}>
                        <Card.Content>
                            <TextInput style={{padding: 5, margin: 10}}
                                       label='Nom'
                                       value={name}
                                       mode={'outlined'}
                                       error={nameError}
                                       onChangeText={nameValue => onNameChange(nameValue)}
                            />
                            <HelperText
                                type="error"
                                visible={true}
                            >{nameErrorMsg}</HelperText>

                            <TextInput style={{padding: 5, margin: 10}}
                                       label='Description offre'
                                       value={description}
                                       mode={'outlined'}
                                       error={descriptionError}
                                       onChangeText={descriptionValue => onDescriptionChange(descriptionValue)}
                            />
                            <HelperText
                                type="error"
                                visible={true}
                            >{descriptionErrorMsg}</HelperText>


                            <TextInput style={{padding: 5, margin: 10}}
                                       label='Description entreprise'
                                       value={descriptionCompany}
                                       mode={'outlined'}
                                       error={descriptionCompanyError}
                                       onChangeText={descriptionCompanyValue => onDescriptionCompanyChange(descriptionCompanyValue)}
                            />
                            <HelperText
                                type="error"
                                visible={true}
                            >{descriptionCompanyErrorMsg}</HelperText>

                            <TextInput style={{padding: 5, margin: 10}}
                                       label='Type de contrat'
                                       value={contract}
                                       mode={'outlined'}
                                       error={contractError}
                                       onChangeText={contractValue => onChangeContract(contractValue)}
                            />
                            <HelperText
                                type="error"
                                visible={true}
                            >{contractErrorMsg}</HelperText>

                            <TextInput style={{padding: 5, margin: 10}}
                                       label='Lieu de travail'
                                       value={workingPlace}
                                       mode={'outlined'}
                                       error={workingPlaceError}
                                       onChangeText={workingPlaceValue => onWorkingPlaceChange(workingPlaceValue)}
                            />
                            <HelperText
                                type="error"
                                visible={true}
                            >{workingPlaceErrorErrorMsg}</HelperText>
                            <DatePicker
                                style={{width: 300}}
                                date={startAt}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 25,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 70
                                    }
                                }}
                                onDateChange={(date) => {
                                    onStartAtChange(date);
                                }}
                            />

                            <Button style={{marginTop: 50, marginBottom: 50}} mode="contained"
                                    onPress={() => onSubmit()}
                                    disabled={btnDisabled}>
                                Confirmer
                            </Button>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ScrollView>
        );
    }

    function RecruteurOfferScreen() {

        let mesOffres = <Text>Aucune offre</Text>;

        if (offresData.length > 0)
        {
            mesOffres = <FlatList
                            data={offresData}
                            renderItem={({ item }) => <Item name={item.name} applies={['test']}/>}
                            keyExtractor={item => item.id}
                        />;
        }

        return (
            <ScrollView>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => {
                        navigation.openDrawer()
                    }}/>

                    <Appbar.Content
                        title="Recruiter"
                        subtitle="L'application pour les recruteurs !"
                    />
                </Appbar.Header>
                <View style={{paddingTop: 15, margin: 30}}>
                    {mesOffres}
                </View>
            </ScrollView>
        );
    }


    function Candidat() {
        return <Tab.Navigator>
            <Tab.Screen name="Invitation" component={HomeCandidatScreen}
                        options={{
                            tabBarLabel: 'Code',
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="qrcode" color={color} size={size}/>
                            ),
                        }}/>
            <Tab.Screen name="Mes offres" component={CandidatOfferScreen}
                        options={{
                            tabBarLabel: 'Mes offres',
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="wallet-giftcard" color={color} size={size}/>
                            ),
                        }}/>
        </Tab.Navigator>
    }

    function HomeCandidatScreen() {
        const [code, onChangeCode] = React.useState('');

        const [loading, onSetLoading] = React.useState(false);
        const [disabled, setDisabled] = React.useState(false);


        const onSubmitCode = async () => {
            onSetLoading(true);
            setDisabled(true);
            const t = await AsyncStorage.getItem('jwt');
            if (t === null) {
                navigation.navigate('Authentication')
            } else {
                try {
                    const me = await axios.post(`${config.default.URL}/me`, {token: t});
                    if (me.status === 200 || me.status === 201) {
                        let userIri = `/users/${me.data[5].id}`;

                        const invitByToken = await axios.get(`${config.default.URL}/invits?token=${code}`, {
                            headers: {
                                'Authorization': `Bearer ${t}`,
                                'Content-type': 'application/json'
                            }
                        });


                        if (invitByToken.status === 200 || invitByToken.status === 201) {
                            if (invitByToken.data["hydra:totalItems"] === 0) {
                                onSetLoading(false);
                                setDisabled(false);
                                ToastAndroid.showWithGravity(
                                    "Code invalide",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                );
                            } else {

                                const responseApply = await axios.post(`${config.default.URL}/applies`, {
                                    "status": "open",
                                    "email": me.data[4].email,
                                    "user": `/users/${me.data[5].id}`
                                }, {
                                    headers: {
                                        'Authorization': `Bearer ${t}`,
                                        'Content-type': 'application/json'
                                    }
                                });

                                let applyId = responseApply.data["@id"].substr(responseApply.data["@id"].lastIndexOf('/') + 1);

                                const putOffre = await axios.put(`${config.default.URL}/offres/${invitByToken.data["hydra:member"][0]["offre"]["id"]}`, {
                                    applies: [`${responseApply.data["@id"]}`]
                                }, {
                                    headers: {
                                        'Authorization': `Bearer ${t}`,
                                        'Content-type': 'application/json'
                                    }
                                });

                                if (putOffre.status === 200 || putOffre.status === 201) {

                                    const putApply = await axios.put(`${config.default.URL}/applies/${applyId}`, {
                                        offer: `${putOffre.data["@id"]}`
                                    }, {
                                        headers: {
                                            'Authorization': `Bearer ${t}`,
                                            'Content-type': 'application/json'
                                        }
                                    });

                                    if (putApply.status === 200 || putApply.status === 200) {
                                        let invitId = invitByToken.data["hydra:member"][0]["@id"].substr(invitByToken.data["hydra:member"][0]["@id"].lastIndexOf('/') + 1);


                                        const deleteInv = await axios.delete(`${config.default.URL}/invits/${invitId}`, {
                                            headers: {
                                                'Authorization': `Bearer ${t}`,
                                                'Content-type': 'application/json'
                                            }
                                        });
                                        console.log("delete iv -> ", deleteInv)
                                        console.log("delete status", deleteInv.status)

                                        if (deleteInv.status === 200 || deleteInv.status === 201 || deleteInv.status === 204) {
                                            navigation.navigate('Mes offres')
                                        } else {
                                            onSetLoading(false);
                                            setDisabled(false);
                                            console.log("3")
                                            ToastAndroid.showWithGravity(
                                                "Une erreur est survenue. Veuillez réessayer.",
                                                ToastAndroid.SHORT,
                                                ToastAndroid.CENTER
                                            );
                                        }

                                    } else {
                                        console.log("2")
                                        onSetLoading(false);
                                        setDisabled(false);
                                        ToastAndroid.showWithGravity(
                                            "Une erreur est survenue. Veuillez réessayer.",
                                            ToastAndroid.SHORT,
                                            ToastAndroid.CENTER
                                        );
                                    }
                                } else {
                                    onSetLoading(false);
                                    setDisabled(false);
                                    console.log("1")
                                    ToastAndroid.showWithGravity(
                                        "Une erreur est survenue. Veuillez réessayer.",
                                        ToastAndroid.SHORT,
                                        ToastAndroid.CENTER
                                    );
                                }
                            }
                        } else {
                            onSetLoading(false);
                            setDisabled(false);
                            console.log("0")
                            ToastAndroid.showWithGravity(
                                "Code invalide",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }

                    } else {
                        onSetLoading(false);
                        setDisabled(false);
                        ToastAndroid.showWithGravity(
                            "Une erreur est survenue, veuillez réessayer",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                } catch (e) {
                    onSetLoading(false);
                    setDisabled(false);
                    ToastAndroid.showWithGravity(
                        "Code invalide",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }

        };

        return (
            <ScrollView>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => {
                        navigation.openDrawer()
                    }}/>

                    <Appbar.Content
                        title="Recruiter"
                        subtitle="L'application pour les recruteurs !"
                    />
                </Appbar.Header>
                <View style={{paddingTop: 30, margin: 30}}>
                    <Text style={{textAlign: 'center', fontSize: 30}}>Code invitation ?</Text>
                    <HelperText
                        type="info"
                        visible={true}>Vous recevez vos codes via votre email d'inscription</HelperText>
                    <Divider style={{margin: 20}}/>
                    <Card style={{padding: 5, marginTop: 30}}>
                        <Card.Content>
                            <TextInput style={{padding: 15, fontSize: 40}}
                                       onChangeText={newCode => onChangeCode(newCode)}
                                       value={code}
                            />
                        </Card.Content>
                    </Card>
                    <Button style={{marginTop: 30}} icon="ticket" mode="contained" disabled={disabled} loading={loading}
                            onPress={() => onSubmitCode()}>
                        Envoyer
                    </Button>
                </View>
            </ScrollView>
        );
    }

    function CandidatOfferScreen() {
        // https://localhost:8443/applies?user.email=t%40t.com

        const [appliesList, setAppliesList] = React.useState([]);

        const apiProcess = async () => {
            try {
                const t = await AsyncStorage.getItem('jwt');
                if (t === null) {
                    navigation.navigate('Acceuil')
                } else {
                    const me = await axios.post(`${config.default.URL}/me`, {token: t});

                    if (me.status === 200 || me.status === 201) {
                        console.log(me.data[2].email)
                        const encodedEmail = encodeURIComponent(me.data[2].email);
                        console.log(`${config.default.URL}/applies?user.email=${encodedEmail}`);
                        const myApplies = await axios.get(`${config.default.URL}/applies?user.email=${encodedEmail}`, {
                            headers: {
                                'Authorization': `Bearer ${t}`,
                                'Content-type': 'application/json'
                            }
                        });

                        if (myApplies.status === 200 || myApplies.status === 201) {
                            setAppliesList(myApplies.data["hydra:member"])
                            console.log("SET LIST", myApplies.data["hydra:member"])
                        } else {
                            ToastAndroid.showWithGravity(
                                "Une erreur est survenue, veuillez réessayer",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }
                    } else {
                        ToastAndroid.showWithGravity(
                            "Une erreur est survenue, veuillez réessayer",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                }
            } catch (e) {
                ToastAndroid.showWithGravity(
                    "Une erreur est survenue, veuillez réessayer",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }

        };

        React.useEffect(() => {
            apiProcess(); // load list
            return () => {
                console.log("unmount")
            }
        }, []);

        console.log("my list", appliesList);

        function Item({data}) { // data => apply
            console.log("candidature", data)
            const str = `Candidature ° ${data.id}`;
            console.log(data.offer);

            const [inputsEditable, setInputsEditable] = React.useState(true);

            const [name, setName] = React.useState("");
            const [nameError, setNameError] = React.useState(false);
            const [nameErrorMsg, setNameErrorMsg] = React.useState("Nom invalide");
            const [isNewName, setIsNewName] = React.useState(false);

            const [firstname, setFirstname] = React.useState("");
            const [firstNameError, setFirstnameError] = React.useState(false);
            const [firstNameErrorMsg, setFirstNameErrorMsg] = React.useState("Prénom invalide");

            const [email, setEmail] = React.useState("");
            const [emailError, setEmailError] = React.useState(false);
            const [emailErrorMsg, setEmailErrorMsg] = React.useState("Email invalide");


            const [age, setAge] = React.useState("");
            const [ageError, setAgeError] = React.useState(false);
            const [ageErrorMsg, setAgeErrorMsg] = React.useState("Age invalide");

            const [adresse, setAdresse] = React.useState("");
            const [adresseError, setAdresseError] = React.useState(false);
            const [adresseErrorMsg, setAdresseErrorMsg] = React.useState("Adresse invalide");


            const [salary, setSalary] = React.useState(0);
            const [salaryError, setSalaryError] = React.useState(false);
            const [salaryErrorMsg, setSalaryErrorMsg] = React.useState("Salaire invalide");

            const [sexeChoice, setSexeChoice] = React.useState("M");

            const [photoUri, setPhotoUri] = React.useState("");
            const [photoFileName, setPhotoFileName] = React.useState("");
            const [photoType, setPhotoType] = React.useState("");
            const [photoAll, setPhotoAll] = React.useState("");


            const [file, setFile] = React.useState(null);

            const [isLoading, setIsLoading] = React.useState(false);
            const [isDisabledSub, setIsDisabledSub] = React.useState(false);

            /*
            const fileUpload = async () => {
                try {
                    const res = await DocumentPicker.pick({
                        type: [DocumentPicker.types.images],
                    });
                    console.log( "OOOOOOOO" ,
                        res.uri,
                        res.type, // mime type
                        res.name,
                        res.size
                    );

                    let formDatal = [];
                    formDatal.push({file :RNFetchBlob.wrap(res.uri) })

                    const t = await AsyncStorage.getItem('jwt');
                    const updatePicture = await axios.post(`${config.default.URL}/media_objects`, fd, {
                        headers: {
                            'Authorization': `Bearer ${t}`,
                            'Content-type': 'multipart/form-data'
                        }
                    });
                    console.log("FILE", updatePicture);

                } catch (err) {
                    if (DocumentPicker.isCancel(err)) {
                        // User cancelled the picker, exit any dialogs or menus and move on
                    } else {
                        throw err;
                    }
                }
            };

             */


            const chooseFile = () => {
                const options = {
                    title: 'Photo de candidature',
                    customButtons: [{name: 'fb', title: 'Photo - Facebook'}],
                    storageOptions: {
                        skipBackup: true,
                        path: 'images',
                    },
                };


                ImagePicker.showImagePicker(options, (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {

                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        setPhotoFileName(response.fileName)
                        setPhotoType(response.type)
                        setPhotoUri(response.uri)
                        setPhotoAll(response);


                    }
                });
            };


            function DisplayStatus({value}) {
                let icon;
                let msg;
                if (value === "open") {
                    icon = "book";
                    msg = "Ouvert";
                } else if (value === "updated") {
                    icon = "star";
                    msg = "finalisé";
                }
                return (
                    <View>
                        <Chip icon={icon}>{msg}</Chip>
                    </View>
                )
            }

            const submitUpdateProfil = async () => {
                setInputsEditable(false)
                setIsLoading(true)
                setIsDisabledSub(true)


                let sexe = sexeChoice === "M" ? "homme" : "femme";

                let payload = {};

                if (name && name.trim().length > 0) {
                    console.log("new name : " + name)
                    payload["name"] = name
                }

                if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) !== false) {
                    console.log("new email" + email)
                    payload["email"] = email;
                }

                payload["sexe"] = sexe;

                if (age && age !== "") {
                    payload["age"] = age;
                }

                if (adresse && adresse !== "") {
                    payload["adresse"] = adresse;
                }

                if(firstname && firstname !== "") {
                    payload["firstname"] = firstname;
                }

                if (salary && salary !== "") {
                    payload["salary"] = salary;
                }


                payload["status"] = "updated";

                // Pick a single file



                // TODO post d'une image + fichier ...
                // TODO put la payload
                // TODO refresh données

                const t = await AsyncStorage.getItem('jwt');
                if (t === null) {
                    setInputsEditable(true)
                    navigation.navigate('Authentication')
                } else {
                    try {
                        const req = await axios.put(`${config.default.URL}/applies/${data.id}`,
                            payload
                            , {
                                headers: {
                                    'Authorization': `Bearer ${t}`,
                                    'Content-type': 'application/json'
                                }
                            });
                        if(req.status === 200 || req.status === 201) {
                            console.log("OK")
                            // TODO _> update picture / cv SI nouveau
                            setInputsEditable(true)
                            setIsDisabledSub(false)
                            setIsLoading(false)
                            ToastAndroid.showWithGravity(
                                "Mis à jour !",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );


                        } else {
                            setInputsEditable(true)
                            setIsLoading(false)
                            setIsDisabledSub(false)
                            ToastAndroid.showWithGravity(
                                "Erreur réseaux, veuillez réessayer",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }
                    } catch (e) {
                        setInputsEditable(true)
                        setIsLoading(false)
                        setIsDisabledSub(false)
                        ToastAndroid.showWithGravity(
                            "Erreur réseaux, veuillez réessayer",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                }


                console.log("update payload , ", payload);


            };

            /*
            console.log("lock");
            console.log("PAYLOAD : ", payload);

            if (photoUri !== null) {
                console.log("update");
                const formData = new FormData();
                //formData.append('file', photoAll);
                const d = JSON.stringify({uri: photoUri, type: photoType, name: photoFileName})
                formData.append("file", d);

                console.log(formData);
                //formData.append('type', `${photoType}`);

                const t = await AsyncStorage.getItem('jwt');
                if (t === null) {
                    navigation.navigate('Acceuil')
                } else {

                    // WIP
                    //  multipart/form-data" -F "file=@Syllabus.pdf;type=application/pdf"

                    try {
                        const updatePicture = await axios.post(`${config.default.URL}/media_objects`, formData, {
                            headers: {
                                'Authorization': `Bearer ${t}`,
                                'Content-type': 'multipart/form-data'
                            }
                        });
                        console.log(updatePicture.status)

                        console.log(updatePicture);
                    } catch (e) {
                        console.log(e);
                        console.log("update pic error", e)
                    }

                    // UPDATE FIELDs out of files

                    let py = {
                        name: ""
                    };

                    if(isNewName && name.trim().length !== "") {
                        py.name = name;
                    }

                    console.log("new name", py.name);

                }
            } else {
                console.log("no update pic")
            }

            console.log("submit profile")
        };

             */


            return (
                <Card style={{margin: 15, padding: 10}}>


                    <Card.Title title={str}/>
                    <Card.Title subtitle={data.offer.name}/>
                    <DisplayStatus value={data.status}></DisplayStatus>

                    <Card.Content>
                        <HelperText style={{marginTop: 10}}>
                            {data.name === null ? '': data.name}
                        </HelperText>
                        <TextInput style={{padding: 5, margin: 10}}
                                   label={'Votre nom'}
                                   value={name}
                                   mode={'outlined'}
                                   error={nameError}
                                   onChangeText={nameValue => {
                                       setName(nameValue);
                                   }}
                                   editable={inputsEditable}
                        />

                        <HelperText style={{marginTop: 10}}>
                            {data.firstname === null ? '': data.firstname}
                        </HelperText>
                        <TextInput style={{padding: 5, margin: 10}}
                                   label={'Votre prénom'}
                                   value={firstname}
                                   mode={'outlined'}
                                   error={nameError}
                                   onChangeText={firstnameValue => {
                                       setFirstname(firstnameValue);
                                   }}
                                   editable={inputsEditable}
                        />

                        <HelperText style={{marginTop: 10}}>
                            {data.email === null ? '': data.email}
                        </HelperText>
                        <TextInput style={{padding: 5, margin: 10}}
                                   label={data.email === null ? 'Votre email' : data.email}
                                   value={email}
                                   mode={'outlined'}
                                   keyboardType={'email-address'}
                                   error={emailError}
                                   onChangeText={emailValue => setEmail(emailValue)}
                                   editable={inputsEditable}
                        />

                        <View style={{
                            margin: 10,
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text>Homme</Text>
                            <RadioButton value="M" status={sexeChoice === 'M' ? 'checked' : 'unchecked'}
                                         onPress={() => setSexeChoice('M')}/>
                            <Text>Femme</Text>
                            <RadioButton value="F" status={sexeChoice === 'F' ? 'checked' : 'unchecked'}
                                         onPress={() => setSexeChoice('F')}/>
                        </View>

                        <HelperText style={{marginTop: 10}}>
                            {data.age === null ? '': data.age}
                        </HelperText>
                        <TextInput style={{padding: 5, margin: 10}}
                                   label={'Votre age'}
                                   value={age}
                                   mode={'outlined'}
                                   keyboardType={'numeric'}
                                   error={ageError}
                                   onChangeText={ageValue => setAge(ageValue)}
                                   editable={inputsEditable}
                        />

                        <HelperText style={{marginTop: 10}}>
                            {data.adresse === null ? '': data.adresse}
                        </HelperText>
                        <TextInput style={{padding: 5, margin: 10}}
                                   label={'Votre adresse'}
                                   value={adresse}
                                   mode={'outlined'}
                                   error={adresseError}
                                   onChangeText={adresseValue => setAdresse(adresseValue)}
                                   editable={inputsEditable}
                        />

                        <HelperText style={{marginTop: 10}}>
                            {data.salary === null ? '': data.salary}
                        </HelperText>
                        <TextInput style={{padding: 5, margin: 10}}
                                   label={'Votre salaire'}
                                   value={salary}
                                   mode={'outlined'}
                                   keyboardType={'numeric'}
                                   error={salaryError}
                                   onChangeText={salaryValue => setSalary(salaryValue)}
                                   editable={inputsEditable}
                        />

                        <View style={{
                            marginTop: 10, alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                            <Text>Photo de profile</Text>
                            <Image source={{uri: photoUri}} style={{height: 150, width: 150}}/>
                        </View>

                        <Button style={{margin: 10}} title="Photo" mode={"contained"} onPress={() => {
                            chooseFile()
                        }}>Photo de profil</Button>

                    </Card.Content>
                    <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
                    <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
                    <Card.Actions>
                        <View>
                            <Button mode={'contained'} loading={isLoading} disabled={isDisabledSub} style={{marginTop: 10,alignItems: 'center',
                                flex: 1,
                                justifyContent: 'center'}} onPress={() => {
                                submitUpdateProfil()
                            }}>Mettre à jour</Button>
                        </View>
                    </Card.Actions>
                </Card>
            );
        }


        if (appliesList.length === 0) {
            return (
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.Action icon="menu" onPress={() => {
                            navigation.openDrawer()
                        }}/>

                        <Appbar.Content
                            title="Recruiter"
                            subtitle="L'application pour les recruteurs !"
                        />
                    </Appbar.Header>
                    <View style={{
                        marginTop: 200, alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Text>Pas de candidatures pour le moment.</Text>
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.Action icon="menu" onPress={() => {
                            navigation.openDrawer()
                        }}/>

                        <Appbar.Content
                            title="Recruiter"
                            subtitle="L'application pour les recruteurs !"
                        />
                    </Appbar.Header>
                    <View style={{paddingTop: 15, margin: 30}}>
                        <FlatList
                            data={appliesList}
                            renderItem={({item}) => <Item data={item}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            )
        }
    }


    const homeCandidat = Candidat();
    const homeRecruteur = Recruteur();


    let renderScreen;

    if (userRole === "ROLE_CANDIDAT") {
        renderScreen = homeCandidat
    } else {
        renderScreen = homeRecruteur
    }


    return (
        renderScreen
    );
}

export default HomeScreen;
