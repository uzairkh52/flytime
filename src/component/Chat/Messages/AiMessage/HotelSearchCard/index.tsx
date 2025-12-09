import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { mainStyle } from '../../../../../assets/styles/component/mainStyle';
import { HotelCardStyle } from '../../../../../assets/styles/component/SearchResult/HotelCardStyle';
import { calculateHotelPricing } from '../../../../../utils/hotelPriceUtils';

const HotelCard = ({
  hotel,
  allHotels,
  onSeeDetails,
  onSelectRoom,
  selectedHotelAmount,
}) => {
  const images = hotel?.content?.images || [];
  const firstImage =
    images.find(img => img.imageTypeCode === 'GEN' && img.order === 1) ||
    images.find(img => img.imageTypeCode === 'GEN');

  const rates = hotel?.rooms?.[0]?.rates || [];
  const firstRate = rates.find(
    rate => !rate.packaging && rate.rateType === 'BOOKABLE',
  );

  const { nights, totalPrice, perNightPrice } = calculateHotelPricing(
    hotel,
    allHotels,
  );

  const adults = firstRate?.adults || 0;
  const children = firstRate?.children || 0;
  const guestText = `${adults} ${adults > 1 ? 'adults' : 'adult'}${
    children > 0 ? `, ${children} ${children > 1 ? 'children' : 'child'}` : ''
  }`;

  const board = firstRate?.boardName ? firstRate.boardName.toLowerCase() : '';

  const location =
    hotel?.content?.address?.content ||
    hotel?.content?.address?.street ||
    'Unknown Location';

  const currentRateAmount = firstRate?.total_netamount_with_markup;
  const isSelectedHotel =
    selectedHotelAmount &&
    currentRateAmount &&
    Number(selectedHotelAmount) === Number(currentRateAmount);

  return (
    <View style={HotelCardStyle.card}>
      {/* ROW WRAPPER */}
      <View style={HotelCardStyle.Hotelrow}>
        {/* LEFT SECTION */}
        <View style={HotelCardStyle.topSection}>
          <View style={HotelCardStyle.leftContent}>
            <Image
              source={{
                uri: firstImage?.url_800 || 'https://via.placeholder.com/160',
              }}
              style={HotelCardStyle.thumbnail}
            />
          </View>

          <View style={HotelCardStyle.rightContent}>
            <Text style={mainStyle.h2}>{hotel?.name}</Text>
            <Text style={mainStyle.size10}>
              {/* <MaterialDesignIcons
                name="map-marker"
                
                style={[mainStyle.size10, mainStyle.black50]}
                
              /> */}
              {location}
              {hotel?.zoneName ? `, ${hotel.zoneName}` : ''}
            </Text>

            <Text style={[mainStyle.size10, mainStyle.blackText]}>
              {hotel?.rooms?.[0]?.name?.split(' ').slice(0, 3).join(' ')} •{' '}
              {guestText}
            </Text>

            <Text style={[mainStyle.size10]}>{board}</Text>

            <Text style={[mainStyle.black50, mainStyle.size10]}>
              {new Date(allHotels?.checkIn).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
              })}{' '}
              -{' '}
              {new Date(allHotels?.checkOut).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
              })}{' '}
            </Text>
            <View
              style={[
                mainStyle.displayFlex,
                mainStyle.justifyContentEnd,
                mainStyle.flexRow,
              ]}
            >
              <Pressable style={mainStyle.BtnSeeDetail} onPress={onSeeDetails}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={mainStyle.Basecolor1}>See details</Text>
                  {/* <MaterialDesignIcons
                    name="chevron-right"
                    size={20}
                    style={mainStyle.Basecolor1}
                  /> */}
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* RIGHT SECTION */}
        <View style={HotelCardStyle.BottomSection}>
          <View>
            <Text style={mainStyle.darkgray}>
              ${Math.round(perNightPrice)} / night
            </Text>
            <Text style={mainStyle.black50}>
              ${Math.round(totalPrice)} total ({nights} nights)
            </Text>
          </View>

          <Pressable
            style={[
              mainStyle.Btn,
              mainStyle.BtnPrimary,
              mainStyle.BtnX,
              mainStyle.BtnRound,
              isSelectedHotel && { backgroundColor: '#ccc' },
            ]}
            onPress={() => onSelectRoom(hotel)}
          >
            <Text style={mainStyle.white}>
              {isSelectedHotel ? 'Selected' : 'Select room'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HotelCard;
