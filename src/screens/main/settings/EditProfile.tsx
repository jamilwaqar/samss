import React, { useEffect, useRef, useState, createRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Keyboard, Animated, StatusBar, Platform, UIManager, Modal, Alert, Pressable, ScrollView } from 'react-native'
import appStyle from '../../../assets/styles/appStyle'
import { ColorSet, Fonts, FamilySet } from '../../../styles'
import { Images } from '../../../constants/assets/images'
import { H3, H4, Button, Input, Header, BottomSheet, ErrorContainer, Loader, H2, Paragraph } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenWidth } from '../../../styles/screenSize'
import ImagePicker from 'react-native-image-crop-picker'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, uploadImage } from '../../../networking/DashboardApiService'
import { api, imagePath } from '../../../networking/Environment'
import { GET_USER_DATA } from '../../../redux/Actions'
import { Helper } from '../../../utils/'
import ToggleSwitch from 'toggle-switch-react-native'

const bottomSheetPicker = createRef()


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const translation = useRef(new Animated.Value(-100)).current
  const opacity = useRef(new Animated.Value(0)).current
  const [headerShown, setHeaderShown] = useState(false)
  const [image, setImage] = React.useState(null)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<number>('')
  const [extension, setExtension] = useState<number>('')
  const [mobileNumber, setMobileNumber] = useState<number>('')
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState<string>('');

  const dispatch = useDispatch()

  const buttonDisabled = firstName === '' || lastName === '' || phoneNumber === ''
  const { user } = useSelector(state => state.userReducer)

  const onChangeText = () => {
    if (error.length > 0) {
      setError('')
      setIsErrorVisible(true)
    }
  }

  useEffect(() => {
    setFirstName(user?.firstname)
    setLastName(user?.lastname)
    setPhoneNumber(user?.phoneNumber)

  }, [])

  useEffect(() => {
    Animated.timing(translation, {
      toValue: headerShown ? 0 : -50,
      duration: 200,
      useNativeDriver: true,
    }).start()
    Animated.timing(opacity, {
      toValue: headerShown ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start()

  }, [headerShown])


  const imageUpload = type => {
    if (type == 1) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        var images = []
        var path = {}
        path['path'] = image.path
        images.push(path)
        setImage(images[0]?.path)
      })
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        var images = []
        var path = {}
        path['path'] = image.path
        images.push(path)
        setImage(images[0]?.path)
      })
    }
    bottomSheetPicker.current?.setModalVisible(false)
  }

  const onPressUpdateProfile = async () => {
    return
    console.log('image===>', image);
    Keyboard.dismiss()
    setIsLoading(true)
    const data = {
      firstname: firstName,
      lastname: lastName,
      phoneNumber: phoneNumber,

    }
    const response: any = await updateProfile(api.updateProfile, data)
    if (image) {
      console.log('uploading profile photo')
      await uploadImage(api.uploadProfilePhoto, image)
    }
    setIsLoading(false)
    if (response != null) {
      dispatch({
        type: GET_USER_DATA,
        payload: response.data,
      });
      Helper.showToast(response.message)
      navigation.pop(2)
    }
    setIsLoading(false)
  }
  const updateNotificationStatus = async (type: Number) => {
    setNotificationStatus(!notificationStatus)

  }
  openNotificationModal = (text: string) => {
    setNotificationTitle(text)
    setModalVisible(true)
  }
  return (
    <View style={[appStyle.safeContainer]}>
      <StatusBar backgroundColor={ColorSet.blue} translucent barStyle={'light-content'} />
      <Header
        navigation={navigation}
        isHamburger={true}
      >Profile
      </Header>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={appStyle.scrollContainer}
        onScroll={event => {
          const scrolling = event.nativeEvent.contentOffset.y
          if (scrolling > 20) {
            setHeaderShown(true)
          } else {
            setHeaderShown(false)
          }
        }}
        scrollEventThrottle={16}
        style={appStyle.flex1}>
        <View style={[appStyle.wrapper]}>

          <View>
            <TouchableOpacity style={styles.profileContainer}
              onPress={() => bottomSheetPicker.current?.setModalVisible()}>
              {image == null ? (
                <Image style={styles.profile} source={
                  user?.profilePicture ? { uri: imagePath + user.profilePicture } : Images.profile} />
              ) : (
                <Image style={styles.profile} source={{ uri: image }} />
              )

              }

              <View
                style={styles.editIconContainer}
              >
                <View style={styles.editIconInner}>
                  <Image style={appStyle.iconSm} source={Images.camera} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <ErrorContainer
              isVisible={isErrorVisible}
              label={error}
              onClose={() => setIsErrorVisible(false)}
            />
            <ErrorContainer label={'this is a error text'} status={'info'} />

            <View style={appStyle.pt15}>
              <View style={[styles.textContainer]}>
                <Input
                  label={'First Name'}
                  value={'Jeremy'}
                  setValue={setFirstName}
                  disabled={true}
                  onChangeText={onChangeText}
                />
              </View>
              <View style={[styles.textContainer]}>
                <Input
                  label={'Last Name'}
                  value={'Hurse'}
                  setValue={setFirstName}
                  disabled={true}
                  onChangeText={onChangeText}
                />
              </View>

              <View style={[styles.textContainer]}>
                <Input
                  label={'E-mail'}
                  value={'admin@emsystemsolutions.com'}
                  setValue={setFirstName}
                  disabled={true}
                  onChangeText={onChangeText}
                />
              </View>

              <View style={[styles.textContainer]}>
                <Input
                  label={'Office Phone'}
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  onChangeText={onChangeText}
                  keyboardType='phone-pad'
                />
              </View>

              <View style={[styles.textContainer]}>
                <Input
                  label={'Extension'}
                  value={extension}
                  setValue={setExtension}
                  onChangeText={onChangeText}
                  keyboardType='phone-pad'
                />
              </View>

              <View style={[styles.textContainer]}>
                <Input
                  label={'Mobile'}
                  value={mobileNumber}
                  setValue={setMobileNumber}
                  onChangeText={onChangeText}
                  keyboardType='phone-pad'
                />
              </View>
              <View style={[appStyle.rowBtw, appStyle.mt20]}>
                <View>
                  <H4 style={styles.title}>Notifications:</H4>
                </View>
                <View style={[appStyle.row, appStyle.jcFlexEnd]}>
                  <Button onPress={() => openNotificationModal('Select Email Notification Type')} containerStyle={{ width: '35%', marginRight: 10, height: 35 }}>Email</Button>
                  <Button onPress={() => openNotificationModal('Select Text Notification Type')} containerStyle={{ width: '35%', height: 35 }}>Text</Button>
                </View>

              </View>
            </View>
          </View>
        </View>
        <View style={[appStyle.aiCenter, appStyle.ph20, appStyle.mb40]}>
          <Button
            containerStyle={appStyle.mt15}
            style={{ ...Fonts.size.small }}
            // disable={buttonDisabled ? true : false}
            disable={false}
            onPress={onPressUpdateProfile}>
            Update Profile
          </Button>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity style={[appStyle.mt40, appStyle.mr20]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image style={{ height: 20, width: 20, alignSelf: 'flex-end', tintColor: ColorSet.grey }} source={Images.close} />
        </TouchableOpacity>
        <View style={[appStyle.aiCenter, appStyle.p10]}>
          <H3>{notificationTitle}</H3>
        </View>
        <ScrollView>
          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Years</H4>
            </View>
            <View style={[appStyle.rowBtw]}>
              <Paragraph>Created</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={() => updateNotificationStatus(1)}
              />

            </View>
            <View style={appStyle.bottomLine} />
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Edited</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
          </View>

          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Users</H4>
            </View>
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Created</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Edited</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Archived</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Restored</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>

          </View>

          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Sports</H4>
            </View>
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Created</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Edited</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Archived</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Restored</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
          </View>

          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Recruits</H4>
            </View>
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Created</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Edited</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Archived</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Restored</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
          </View>

          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Awards</H4>
            </View>
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Created</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Edited</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Approved</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Awarded</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Archived</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Restored</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>

          </View>

          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Reports</H4>
            </View>
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Created</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Archived</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Restored</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
          </View>

          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Support</H4>
            </View>
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Created</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Responded</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
            <View style={appStyle.bottomLine} />

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Closed</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>

            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>Reopened</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
          </View>

          <View
            style={[appStyle.detailCard, appStyle.w100, appStyle.hAuto]}>
            <View style={appStyle.pb15}>
              <H4>Messages</H4>
            </View>
            <View style={[appStyle.rowBtw, appStyle.pb5]}>
              <Paragraph>New Messages</Paragraph>
              <ToggleSwitch
                isOn={notificationStatus}
                onColor={ColorSet.purple}
                offColor={ColorSet.greyMid}
                size="small"
                onToggle={updateNotificationStatus}
              />
            </View>
          </View>

        </ScrollView>
      </Modal>



      <BottomSheet
        bottomSheetRef={bottomSheetPicker}
        closeOnTouchBackdrop
        bottomCloseBtn={false}
        overlayOpacity={0.34}>
        <View>
          <TouchableOpacity
            onPress={() => bottomSheetPicker.current?.setModalVisible(false)}
            style={[appStyle.asFlexEnd]}>
            <Image
              style={[styles.icon, { tintColor: ColorSet.grey }]}
              source={Images.close}
            />
          </TouchableOpacity>
          <View style={[appStyle.pv15, appStyle.aiCenter]}>
            <H3>Upload image</H3>
          </View>
          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity
              onPress={() => imageUpload(1)}
              style={[styles.uploadBtn]}>
              <Image style={styles.uploadIcon} source={Images.camera} />
              <H4 style={appStyle.pt5,{...styles.title}}>
                Take photo
              </H4>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => imageUpload(2)}
              style={[styles.uploadBtn]}>
              <Image style={styles.uploadIcon} source={Images.folder} />
              <H4 style={appStyle.pt5,{...styles.title}}>
                Upload photo
              </H4>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setImage(null)}
              style={[styles.uploadBtn]}>
              <Image style={styles.uploadIcon} source={Images.deleteImg} />
              <H4 style={appStyle.pt5,{...styles.title}}>
                Remove photo
              </H4>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <Loader
        isLoading={isLoading}
        // shadow={false}
        layout={'outside'}
      // message={'Verifying your information...'}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FamilySet.regular,

  },

  uploadBtn: {
    width: '30%',
    backgroundColor: ColorSet.blueLight,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
    borderColor: ColorSet.theme,
    borderWidth: 1.5,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  uploadBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadIcon: {
    width: 60,
    height: 45,
    resizeMode: 'contain',
    tintColor: ColorSet.theme,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    alignItems: 'center',
    marginTop: '20%',
  },
  bold: { fontFamily: FamilySet.bold },
  image: {
    width: 30,
    height: 75,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: 70,
    height: 70,
    marginLeft: 30
    // marginTop:30,

  },
  heading: {
    color: ColorSet.purple,
    textDecorationLine: 'underline',
    marginRight: 20,
    fontFamily: FamilySet.bold
  },
  profileContainer: {
    borderRadius: 400,
    // padding: 20,
    // overflow: 'hidden',
    width: screenWidth.width30,
    height: screenWidth.width30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
    alignSelf: 'center',
    marginTop: 20,
    // borderWidth: 0.5,
    // borderColor: '#ddd',
    position: 'relative'
  },
  profile: {
    width: screenWidth.width30 - 10,
    height: screenWidth.width30 - 10,
    borderRadius: 200,
    resizeMode: 'cover'
  },
  editIconContainer: {
    borderRadius: 400,
    padding: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
    position: 'absolute',
    right: -4,
    bottom: 15
  },
  editIconInner: {
    backgroundColor: ColorSet.purple,
    padding: 3,
    borderRadius: 400
  },



})

export default ProfileScreen
