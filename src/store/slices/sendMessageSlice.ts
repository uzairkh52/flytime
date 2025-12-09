import { createSlice } from '@reduxjs/toolkit';

import {
  setflightDetail,
  setSelectedFlightKey,
  setSingleFlightData,
  bookFlight,
  setCartType,
  setGetCartDetail,
  resetBookingState,
} from './BookingflightSlice';
import {
  resetPassengerFlightState,
  setAddFilledPassenger,
  setAllPassengerFill,
  setOrderUuid,
  setViewPassengers,
} from './passengerDrawerSlice';
import {
  clearGetMessages,
  fetchMessages,
  setSearchHistoryGet,
} from './GestMessageSlice';
import {
  setIsBuilderDialog,
  setMobileNaveDrawer,
  setThreadDrawer,
} from './Base/baseSlice';
import { resetOrderState, setOrderData } from './PaymentSlice';
import {
  resetPassengerHotelState,
  setOrderUuidHotel,
} from './passengerDrawerHotelSlice';
import { resetBaggageState } from './BaggageSlice';
import { resetHotelState, setSelectedhotelCode } from './HotelSlice';
import api from '../config/api';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import axios from 'axios';

const sendMessageSlice = createSlice({
  name: 'sendMessage',
  initialState: {
    messages: [],
    isLoading: false,
    newChatLoading: false,
    inputLoading: false,
    AllFlightPostApi: null,
    SearchHistorySend: null,
    ThreadUUIDsend: null,
    TopOfferUrlSend: null,
    isPolling: { status: false, argument: null },
    pollingComplete: false,
    Createthread: null,
    AllOfferUrl: '',
    appendFlights: { nextPageNo: 2, ai: '' },
    AddBuilder: null,
    noMoreFlights: false,
    threadUuid: null,
    functionType: null,
    isUpdateOffer: false,
    error: null,
    hotelSearchId: null,
    systemMessage: null,
    allOfferUUIDSend: null,
  },
  reducers: {
    setSystemMessage: (state, action) => {
      state.systemMessage = action.payload;
    },
    setHotelSearchId: (state, action) => {
      state.hotelSearchId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFunctionType: (state, action) => {
      state.functionType = action.payload;
    },
    setInputLoading: (state, action) => {
      state.inputLoading = action.payload;
    },
    setNoMoreFlights: (state, action) => {
      state.noMoreFlights = action.payload;
    },
    setAddBuilder: (state, action) => {
      state.AddBuilder = action.payload;
    },
    setFilterUrl: (state, action) => {
      state.FilterUrl = action.payload;
    },
    setIsFunction: (state, action) => {
      state.IsFunction = action.payload;
    },
    setThreadUuid: (state, action) => {
      state.threadUuid = action.payload;
    },
    setAppendFlights: (state, action) => {
      const { ai, nextPageNo } = action.payload;
      if (!state.appendFlights.ai || !state.appendFlights.ai.offers) {
        state.appendFlights.ai = ai;
      } else {
        state.appendFlights.ai.offers = [
          ...state.appendFlights.ai.offers,
          ...(ai?.offers || []),
        ];
      }
      if (nextPageNo) state.appendFlights.nextPageNo = nextPageNo;
    },
    setNextMessage: (state, action) => {
      state.NextMessage = action.payload;
    },
    setCreatethread: (state, action) => {
      state.Createthread = action.payload;
    },
    setClearflight: state => {
      state.messages = state.messages.filter(
        msg =>
          msg?.type !== 'flight_placeholder' && msg?.type !== 'flight_result',
      );
    },
    setpollingComplete: (state, action) => {
      state.pollingComplete = action.payload;
    },
    setisPolling: (state, action) => {
      state.isPolling = action.payload;
    },
    setTopOfferUrlSend: (state, action) => {
      state.TopOfferUrlSend = action.payload;
    },
    setAllOfferUUIDSend: (state, action) => {
      state.allOfferUUIDSend = action.payload;
    },
    setAllOfferUrl: (state, action) => {
      state.AllOfferUrl = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNewChatLoading: (state, action) => {
      state.newChatLoading = action.payload;
    },
    setMessage: (state, action) => {
      const newMsg = action.payload;
      if (newMsg?.ai?.passengerFlowRes !== undefined) {
        state.messages = state.messages.filter(
          msg => msg?.ai?.passengerFlowRes === undefined,
        );
      }
      if (newMsg?.ai?.append) {
        state.messages.push(newMsg);
        return;
      }
      state.messages.push(newMsg);
    },
    setIsUpdateOffer: (state, action) => {
      state.isUpdateOffer = action.payload;
    },
    setUpdateOffer: state => {
      state.messages = state.messages.map(msg =>
        msg.ai?.offers ? { ...msg, ai: { ...msg.ai, offers: [] } } : msg,
      );
    },
    setAllFlightResults: (state, action) => {
      state.AllFlightPostApi = action.payload;
    },
    setSearchHistorySend: (state, action) => {
      state.SearchHistorySend = action.payload;
    },
    setThreadUUIDsend: (state, action) => {
      state.ThreadUUIDsend = action.payload;
    },
    setClearChat: state => {
      state.messages = [];
      state.ThreadUUIDsend = null;
    },
    setResetAppendFlights: state => {
      state.appendFlights = { nextPageNo: 2, ai: '' };
      state.noMoreFlights = false;
    },
  },
});


export const sendMessage = (userMessage: any) => async (dispatch, getState) => {
  try {
    const { sendMessage: messageState } = getState();
    let uuid = messageState.threadUuid;

    // -----------------------------
    // 1. Create thread only ONCE
    // -----------------------------
    if (!uuid) {
      const threadRes = await api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND);
      uuid = threadRes.data?.uuid;
      dispatch(setThreadUuid(uuid));
      console.log("Thread CREATED:", uuid);
    } else {
      console.log("Reusing EXISTING thread:", uuid);
    }

    // -----------------------------
    // 2. Dispatch user message
    // -----------------------------
    dispatch(setMessage({ user: userMessage }));

    // -----------------------------
    // 3. Send user message to thread
    // -----------------------------
    const sendUrl = `${API_ENDPOINTS.CHAT.SEND_MESSAGE}/${uuid}`;
    dispatch(setLoading(true));

    const res = await api.post(sendUrl, {
      user_message: userMessage,
      background_job: false,
    });

    const data = res.data;

    // -----------------------------
    // 4. Dispatch AI response
    // -----------------------------
    if (data) {
      const aiResponse = data?.response || data;
      console.log("aiResponse", aiResponse);

      if (!data?.is_function) {
        dispatch(setMessage({ ai: { message: aiResponse } }));
      }

      // -----------------------------
      // 5. Handle function calls (flight/hotel flows)
      // -----------------------------
      if (data?.is_function) {
        const funcName = data?.function_template?.[0]?.function?.name || null;
        dispatch(setFunctionType(funcName));
        dispatch(setIsFunction({ status: true }));

        // ---- Flight flow ----
        const allFlightSearchApi = data?.response?.results?.view_all_flight_result_api?.url;
        const allFlightSearchUuid = data?.response?.results?.view_all_flight_result_api?.uuid;
        console.log("data__results", data?.response?.results);
        

        if (allFlightSearchApi) {
          dispatch(setAllOfferUUIDSend(allFlightSearchUuid));
          dispatch(setAllOfferUrl(allFlightSearchApi));
          dispatch(setFilterUrl(allFlightSearchApi));

          const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;

          try {
            const [historyRes, flightRes] = await Promise.all([
              api.get(historyUrl).catch(() => null),
              api.get(allFlightSearchApi).catch(() => null),
            ]);

            if (historyRes?.data?.search) {
              dispatch(setSearchHistorySend({ flight: historyRes.data.search }));
            }

            if (flightRes?.data) {
              const flightData = flightRes.data;
              if (!flightData?.offers || flightData?.offers.length === 0) {
                dispatch(setMessage({ ai: { response: "No flights found" } }));
              } else {
                dispatch(
                  setMessage({
                    ai: {
                      ...flightData,
                      url: allFlightSearchApi,
                      response: data.response,
                      append: true,
                    },
                    type: "flight_result",
                  })
                );
              }
            }
          } finally {
            dispatch(setLoading(false));
          }
        }

        // ---- Hotel flow ----
        const hotelSearchApi = data?.response?.results?.view_hotel_search_api?.url;
        const hotelSearchUuid = data?.response?.results?.view_hotel_search_api?.uuid;
        const hotelArguments = data?.silent_function_template?.[0]?.function?.arguments || {};

        if (hotelSearchApi) {
          dispatch(setHotelSearchId(hotelSearchUuid));
          dispatch(setSearchHistorySend({ hotel: hotelArguments }));
          dispatch(setLoading(true));

          try {
            const hotelRes = await api.get(hotelSearchApi);
            const isComplete = hotelRes?.data?.is_complete;

            // Clear old flight messages
            dispatch(setClearflight());

            if (isComplete) {
              dispatch(setMessage({ ai: hotelRes.data, type: "hotel_result" }));
            } else {
              // Parse hotel filters from URL
              let hotelName = null;
              let hotelCategory = null;
              let filterUrl = null;

              try {
                const parsedUrl = new URL(
                  hotelSearchApi,
                  typeof window !== "undefined"
                    ? window.location.origin
                    : "https://demo.milesfactory.com"
                );
                hotelName = parsedUrl.searchParams.get("name");
                hotelCategory = parsedUrl.searchParams.get("category");
                if (parsedUrl.search && parsedUrl.search.length > 1) {
                  filterUrl = hotelSearchApi;
                }
              } catch (err) {
                console.warn("Invalid hotel filter URL:", err);
              }

              dispatch(
                setMessage({
                  ai: {
                    ...hotelRes.data,
                    filters: {
                      name: hotelName,
                      category: hotelCategory,
                      filterurl: filterUrl,
                    },
                  },
                  type: "hotel_result",
                })
              );
            }
          } catch (err) {
            console.error(
              "Error fetching hotel results:",
              err.response?.data || err.message
            );
            dispatch(
              setMessage({
                ai: { response: err.response?.data || { error: err.message } },
                type: "hotel_error",
              })
            );
          } finally {
            dispatch(setLoading(false));
          }
        }
      }
    }
  } catch (error: any) {
    console.log("Send Error:", error.response?.data || error.message);
    dispatch(setLoading(false));
  } finally {
    dispatch(setLoading(false));
  }
};


export const deleteAndCreateThread = () => async dispatch => {
  try {
    dispatch(setNewChatLoading(true));

    // 1️⃣ Create a new thread
    const res = await api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND);
    const newUuid = res.data?.uuid;
    if (!newUuid) throw new Error('Failed to create new thread');

    // 2️⃣ Reset all slices related to previous thread
    dispatch(setLoading(false));
    dispatch(setAllPassengerFill(null));
    dispatch(setSelectedFlightKey(null));
    dispatch(setCartType(null));
    dispatch(setGetCartDetail(null));
    dispatch(setResetAppendFlights());
    dispatch(setNoMoreFlights(false));
    dispatch(setThreadUuid(newUuid));
    dispatch(setMobileNaveDrawer(false));
    dispatch(setIsBuilderDialog(false));
    dispatch(setClearChat());
    dispatch(clearGetMessages());
    dispatch(setSearchHistorySend(null));
    dispatch(setSearchHistoryGet(null));
    dispatch(setAddBuilder(null));
    dispatch(setflightDetail(null));
    dispatch(setViewPassengers([]));
    dispatch(setAddFilledPassenger(null));
    dispatch(setHotelSearchId(null));

    // Reset booking, hotel, passenger & baggage slices
    dispatch(resetBookingState());
    dispatch(resetHotelState());
    dispatch(resetPassengerFlightState());
    dispatch(resetPassengerHotelState());
    dispatch(resetBaggageState());

    // Reset order & flight selections
    dispatch(setOrderUuid(null));
    dispatch(setOrderUuidHotel(null));

    // Optional: add a placeholder message for new thread
    dispatch(setMessage({ ai: { newThread: true }, type: 'system' }));
  } catch (err) {
    console.error('Failed to delete and create new thread:', err);
  } finally {
    dispatch(setNewChatLoading(false));
  }
};

export const {
  setLoading,
  setMessage,
  setAllFlightResults,
  setSearchHistorySend,
  setThreadUUIDsend,
  setClearChat,
  setTopOfferUrlSend,
  setisPolling,
  setpollingComplete,
  setCreatethread,
  setClearflight,
  setAllOfferUrl,
  setNextMessage,
  setAppendFlights,
  setnextPageNo,
  setThreadUuid,
  setIsFunction,
  setFilterUrl,
  setAddBuilder,
  setNoMoreFlights,
  setInputLoading,
  setNewChatLoading,
  setFunctionType,
  setResetAppendFlights,
  setUpdateOffer,
  setIsUpdateOffer,
  setError,
  setHotelSearchId,
  setSystemMessage,
  setAllOfferUUIDSend,
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
