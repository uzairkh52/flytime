import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import { mainStyle } from '../../../../../../assets/styles/component/mainStyle';
import { flightStyles } from '../../../../../../assets/styles/component/SearchResult/flightStyles';
import { SvgUri } from 'react-native-svg';


const FromAndTo = ({ offerData }: any) => {
  if (!offerData) return null;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });

  const formatTime = (time: string) =>
    new Date(time)
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/ AM| PM/, '');

  const getUniqueBaggage = () => {
    const map = new Map();
    offerData?.slices?.forEach(slice => {
      slice?.segments?.forEach(segment => {
        segment?.passengers?.forEach(passenger => {
          passenger?.baggages?.forEach(baggage => {
            const key = `${baggage.type}-${baggage.formatted_type}`;
            if (!map.has(key)) map.set(key, baggage);
          });
        });
      });
    });
    return Array.from(map.values());
  };

  return (
    <View style={flightStyles.topSection}>
      {/* First Slice Info */}
      {offerData?.slices?.slice(0, 1).map((slice: any, index: number) => (
        <View key={index} style={flightStyles.rowExtraInfo}>
          <View
            style={[
              mainStyle.displayFlex,
              mainStyle.flexRow,
              flightStyles.airlineRow,
            ]}
          >
            <Text>{slice.segments[0]?.marketing_carrier?.name}</Text>
            <Text style={flightStyles.cabinClass}>
              {Array.from(
                new Set(
                  slice?.segments
                    ?.flatMap(segment =>
                      segment?.passengers?.map(p => p?.cabin_class),
                    )
                    ?.filter(Boolean),
                ),
              )
                .map(cabin =>
                  String(cabin)
                    .replace(/\b\w/g, c => c.toUpperCase())
                    .slice(0, 3),
                )
                .join(', ') || 'No Cabin Info'}
            </Text>
          </View>
        </View>
      ))}

      {/* All Slices */}
      <View style={flightStyles.FromAndToRow}>
        {offerData?.slices.map((slice, index) => (
          <View key={index} style={flightStyles.FromAndToRow}>
            <View
              style={[
                flightStyles.fromAndToDetail,
                mainStyle.flexRow,
                mainStyle.alignItemsCenter,
              ]}
            >
              {/* Logo inside detail row for one-way flights */}
              {offerData?.slices.length < 2 && (
                <>
                  <View style={flightStyles.airlineLogo}>
                    <SvgUri
                      width="50"
                      height="50"
                      uri={offerData?.iconUrl} // your SVG URL
                    />
                  </View>
                </>
              )}

              <View style={[flightStyles.FlightTimingsCol]}>
                {/* Top row: departure date, duration, arrival date */}
                <View
                  style={[
                    flightStyles.FromTopRow,
                    mainStyle.flexRow,
                    mainStyle.justifyContentBetween,
                    mainStyle.alignItemsCenter,
                  ]}
                >
                  <Text style={flightStyles.flightDay}>
                    {new Date(slice.departing_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                  <Text style={flightStyles.Duration}>{slice.duration}</Text>
                  <Text style={flightStyles.flightDay}>
                    {new Date(slice.arriving_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                </View>

                {/* Middle row: departure time, dotted line, arrival time */}
                <View
                  style={[
                    flightStyles.DetailRow,
                    mainStyle.flexRow,
                    mainStyle.alignItemsCenter,
                    mainStyle.justifyContentCenter,
                  ]}
                >
                  <View style={flightStyles.Timings}>
                    <Text style={flightStyles.flightTime}>
                      {new Date(slice.departing_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </Text>
                  </View>

                  {/* Flight duration & dotted line */}
                  <View
                    style={[
                      flightStyles.flightDurationBox,
                      mainStyle.flexColumn,
                      mainStyle.alignItemsCenter,
                      { flex: 1 },
                    ]}
                  >
                    {slice.segments.length > 1 && (
                      <View style={flightStyles.dots}>
                        {Array.from({ length: slice.segments.length - 1 }).map(
                          (_, i) => (
                            <View key={i} style={flightStyles.dot} />
                          ),
                        )}
                      </View>
                    )}
                  </View>

                  <View style={[flightStyles.Timings, mainStyle.alignItemsEnd]}>
                    <Text style={flightStyles.flightTime}>
                      {new Date(slice.arriving_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </Text>
                  </View>
                </View>

                {/* Bottom row: origin code, route info, destination code */}
                <View
                  style={[
                    flightStyles.ToBottomRow,
                    mainStyle.flexRow,
                    mainStyle.justifyContentBetween,
                    mainStyle.alignItemsCenter,
                  ]}
                >
                  <Text style={[flightStyles.flightRoute, { fontSize: 10 }]}>
                    {slice.origin.iata_code}
                  </Text>

                  <Text
                    style={[
                      flightStyles.destination,
                      { fontWeight: '600', color: 'gray' },
                    ]}
                  >
                    {slice.segments.length === 1 ? (
                      'Direct'
                    ) : (
                      <>
                        <Text style={{ color: 'red' }}>
                          {slice.segments.length - 1} stop
                        </Text>
                        {slice.segments.slice(0, -1).map((segment, i) => (
                          <Text key={i}>
                            {' '}
                            - {segment.destination.iata_code}
                          </Text>
                        ))}
                        {slice.segments.length - 1 > 1 ? 's' : ''}
                      </>
                    )}
                  </Text>

                  <Text style={[flightStyles.flightRoute, { fontSize: 10 }]}>
                    {slice.destination.iata_code}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

    </View>
  );
};

export default FromAndTo;
