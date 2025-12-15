import { createSlice } from '@reduxjs/toolkit';


import { resetOrderState, setOrderData } from './PaymentSlice';



import api from '../config/api';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import axios from 'axios';
import { resetPassengerFlightState, setAddFilledPassenger, setAllPassengerFill, setOrderUuid, setViewPassengers } from './passengerFlightSlice';
import { setCartType, setflightDetail, setGetCartDetail, setSelectedFlightKey } from './BookingflightSlice';
import { resetBaggageState } from './baggageSlice';

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
    dispatch(setLoading(true));
  try {
    const { sendMessage: messageState } = getState();
    let uuid = messageState.threadUuid;

    console.log("sendMessageApi", userMessage);
    console.log("messageState UUID:", uuid);

    // add user message immediately
    dispatch(setMessage({ user: userMessage }));
    dispatch(setLoading(true));

    // -------------------------------------------------
    // Create Thread (used only if threadUuid = null)
    // -------------------------------------------------
    const createThread = () =>
      console.log("api_url_",API_ENDPOINTS.CHAT.CREATE_THREAD_SEND);
      
      api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
        .then((res) => {
          const newUuid = res?.data?.uuid;
          dispatch(setThreadUuid(newUuid));
          console.log("Thread CREATED:", newUuid);
          return newUuid;
        }).catch((err) => {
          console.log("message_err", err)
        })

    // -------------------------------------------------
    // Send Message to Existing Thread
    // -------------------------------------------------
    const sendToThread = (uuid: string) => {
      const sendUrl = `${API_ENDPOINTS.CHAT.SEND_MESSAGE}/${uuid}`;

      return api.post(sendUrl, {
        user_message: userMessage,
        background_job: false,
      })
        .then((res) => {
          const data = res.data;
          console.log("AI Response Raw:", data);

          // ---------------------------
          // NORMAL TEXT AI RESPONSE
          // ---------------------------
          if (!data?.is_function) {
            dispatch(setMessage({ ai: { message: data?.response || data } }));
          }

          // -------------------------------------------------
          // FUNCTION START
          // -------------------------------------------------
          dispatch(setLoading(false));
          if (data?.is_function) {
            const funcName =
              data?.function_template?.[0]?.function?.name || null;

            dispatch(setFunctionType(funcName));
            dispatch(setIsFunction({ status: true }));

            // ==============================
            //       FLIGHT SEARCH FLOW
            // ==============================
            const allFlightSearchApi =
              data?.response?.results?.view_all_flight_result_api?.url;
            const allFlightSearchUuid =
              data?.response?.results?.view_all_flight_result_api?.uuid;

            if (allFlightSearchApi) {
              dispatch(setAllOfferUUIDSend(allFlightSearchUuid));
              dispatch(setAllOfferUrl(allFlightSearchApi));
              dispatch(setFilterUrl(allFlightSearchApi));

              const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;

              return Promise.all([
                api.get(historyUrl).catch(() => null),
                api.get(allFlightSearchApi).catch(() => null),
              ])
                .then(([historyRes, flightRes]) => {
                  if (historyRes?.data?.search) {
                    dispatch(
                      setSearchHistorySend({ flight: historyRes.data.search })
                    );
                  }

                  if (flightRes?.data) {
                    const flightData = flightRes.data;

                    if (!flightData?.offers?.length) {
                      dispatch(
                        setMessage({ ai: { response: "No flights found" } })
                      );
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
                });
            }

            // ==============================
            //            HOTEL FLOW
            // ==============================
            const hotelSearchApi =
              data?.response?.results?.view_hotel_search_api?.url;
            const hotelSearchUuid =
              data?.response?.results?.view_hotel_search_api?.uuid;
            const hotelArguments =
              data?.silent_function_template?.[0]?.function?.arguments || {};

            if (hotelSearchApi) {
              dispatch(setHotelSearchId(hotelSearchUuid));
              dispatch(setSearchHistorySend({ hotel: hotelArguments }));

              return api
                .get(hotelSearchApi)
                .then((hotelRes) => {
                  const hotelData = hotelRes?.data;

                  // clear previous flight results
                  dispatch(setClearflight());

                  if (hotelData?.is_complete) {
                    dispatch(
                      setMessage({ ai: hotelData, type: "hotel_result" })
                    );
                  } else {
                    let filterUrl = null;
                    let hotelName = null;
                    let hotelCategory = null;

                    try {
                      const parsed = new URL(hotelSearchApi);
                      hotelName = parsed.searchParams.get("name");
                      hotelCategory = parsed.searchParams.get("category");
                      if (parsed.search) filterUrl = hotelSearchApi;
                    } catch (err) {
                      console.warn("Invalid hotel filter URL:", err);
                    }

                    dispatch(
                      setMessage({
                        ai: {
                          ...hotelData,
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
                })
                .catch((err) => {
                  dispatch(
                    setMessage({
                      ai: {
                        response:
                          err.response?.data || { error: err.message },
                      },
                      type: "hotel_error",
                    })
                  );
                });
            }
          }
        });
    };

    // -------------------------------------------------
    // MAIN THREAD FLOW (FIXED ⚡)
    // -------------------------------------------------
    if (!uuid) {
      console.log("No thread → creating new thread…");
      uuid = await createThread();   // 🔥 FIX: Wait for the thread
    }

    console.log("Sending message to thread:", uuid);
    return sendToThread(uuid);

  } catch (err: any) {
    console.log("Send Error:", err.response?.data || err.message);
  } finally {
    // dispatch(setLoading(false));
  }
};


export const deleteAndCreateThread = () => async (dispatch, getState) => {
  dispatch(setNewChatLoading(true));

  try {
    const res = await api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND);
    const newUuid = res?.data?.uuid;

    if (!newUuid) {
      throw new Error("Thread UUID missing from response");
    }

    // Reset all thread-related states
    dispatch(setLoading(false));
    dispatch(setAllPassengerFill(null));
    dispatch(setSelectedFlightKey(null));
    dispatch(setCartType(null));
    dispatch(setGetCartDetail(null));
    dispatch(setResetAppendFlights());
    dispatch(setNoMoreFlights(false));
    dispatch(setThreadUuid(newUuid));
    
    dispatch(setClearChat());
    // dispatch(clearGetMessages());
    dispatch(setSearchHistorySend(null));
    // dispatch(setSearchHistoryGe(null));
    dispatch(setAddBuilder(null));
    dispatch(setflightDetail(null));
    dispatch(setViewPassengers([]));
    dispatch(setAddFilledPassenger(null));
    dispatch(setHotelSearchId(null));

    // dispatch(resetBooking());
    // dispatch(resetHotelStar());
    dispatch(resetPassengerFlightState());
    dispatch(resetPassengerFlightState());
    dispatch(resetBaggageState());

    dispatch(setOrderUuid(null));
    dispatch(setOrderUuid(null));

    dispatch(setMessage({ ai: { newThread: true }, type: "system" }));
  } catch (err) {
    console.error("Failed to create new thread:", err);

    // <-- FIX 404
    if (err?.response?.status === 404) {
      console.warn("Thread API 404 → Wrong path or backend endpoint missing");
    }
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
