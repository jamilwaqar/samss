import {Platform} from 'react-native';
import {Method, fetchData} from './NetworkManager';
import {Storage} from '../utils';
import {ResponseCode} from '../styles';
import SimpleToast from 'react-native-simple-toast';
const NETWORK_ERROR = 'Network error';

export const getData = async (endpoint: any) => {
  const user = await Storage.getDataFromStorage('user');
  const route = endpoint + user._id;
  const result = await fetchData(route, Method.GET, null);
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && result.status == ResponseCode.error) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const getDataWithoutId = async (endpoint: any) => {
  const result = await fetchData(endpoint, Method.GET, null);
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && result.status == ResponseCode.error) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const submitData = async (endpoint: any, data: any, id = null) => {
  const user = await Storage.getDataFromStorage('user');
  let route = endpoint + user._id;
  if (id) {
    route = endpoint + user._id + '/' + id;
  }
  const result = await fetchData(route, Method.POST, data);
  console.log('result---->', result)
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && (result.status == ResponseCode.error || result.status == ResponseCode.notFound)) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const deleteData = async (endpoint: any, id: any, data: any) => {
  const route = endpoint + id;
  const result = await fetchData(route, Method.POST, data);
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && result.status == ResponseCode.error) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const uploadImage = async (endpoint: any, imageUrl: any) => {
  const user = await Storage.getDataFromStorage('user');
  let route = endpoint + user._id;
  let formData = new FormData();
  if (imageUrl) {
    var uri =
      Platform.OS === 'ios' ? imageUrl.replace('file://', '') : imageUrl;
    let localUri = decodeURIComponent(uri);
    let filename = localUri.split('/').pop();
    let type = 'image/jpeg';
    // let type = match ? `image/${match[1]}` : `image`;
    formData.append(
      'profilePicture',
      typeof {uri: localUri, name: filename, type} != 'undefined'
        ? {uri: localUri, name: filename, type}
        : 0,
    );
  }
  const result = await fetchData(route, Method.POST, formData, true, true);
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && result.status == ResponseCode.error) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const updateProfile = async (endpoint: any, data: any) => {
  const user = await Storage.getDataFromStorage('user');
  let route = endpoint + user._id;
  const result = await fetchData(route, Method.POST, data);
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && result.status == ResponseCode.error) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const getDataWithEmail = async (endpoint: any) => {
  const user = await Storage.getDataFromStorage('user');
  const route = endpoint + user.email;
  const result = await fetchData(route, Method.GET, null);
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && result.status == ResponseCode.error) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const submitKycDocument = async (endpoint: any, params: any) => {
  const user = await Storage.getDataFromStorage('user');
  let route = endpoint + user._id;
  let formData = new FormData();
  var frontImage = params.kycFrontImageUrl;
  var backImage = params.kycBackImageUrl;
  if (frontImage) {
    var uri =
      Platform.OS === 'ios' ? frontImage.replace('file://', '') : frontImage;
    let localUri = decodeURIComponent(uri);
    let filename = localUri.split('/').pop();
    let type = 'image/jpeg';
    formData.append(
      'kycFront',
      typeof {uri: localUri, name: filename, type} != undefined
        ? {uri: localUri, name: filename, type}
        : 0,
    );
  }

  if (backImage) {
    var uri =
      Platform.OS === 'ios' ? backImage.replace('file://', '') : backImage;
    let localUri = decodeURIComponent(uri);
    let filename = localUri.split('/').pop();
    let type = 'image/jpeg';
    formData.append(
      'kycBack',
      typeof {uri: localUri, name: filename, type} != undefined
        ? {uri: localUri, name: filename, type}
        : 0,
    );
  }

  if (params.country) {
    formData.append('country', params.country);
  }

  if (params.documentExpiry) {
    formData.append('documentExpiry', params.documentExpiry);
  }
  if (params.nameOnDocument) {
    formData.append('nameOnDocument', params.nameOnDocument);
  }
  if (params.documentType) {
    formData.append('documentType', params.documentType);
  }
  const result = await fetchData(route, Method.POST, formData, true, true);
  if (result && result.status == ResponseCode.success) {
    return result;
  } else if (result && result.status == ResponseCode.error) {
    SimpleToast.show(result.message);
    return null;
  } else {
    SimpleToast.show(NETWORK_ERROR);
    return null;
  }
};

export const graphData = async (endpoint: any) => {
  const params = '/market_chart?vs_currency=usd&days=3&interval=daily';
  const route = endpoint + params;
  const result = await fetchData(route, Method.GET, null, true, false, true);
  return result;
};