<!-- 注意事项, 由于vue3的深度监听问题 map相关的变量需要使用markRaw包裹 切记! -->
<template>
    <div class="w-full h-full" id="map"></div>
</template>

<script lang="ts" setup>
import { ref, markRaw, onMounted } from 'vue'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import 'leaflet/dist/leaflet.css'
import { kml } from '@tmcw/togeojson'
import * as turf from '@turf/turf';

import geoJson from 'geoJson'
const ak = 'your key here'



let map: L.Map | null = null
let rootlay = markRaw(L.layerGroup())
const layers = ref<{ key: string, layer: any, marks?: L.Marker[] }[]>([])

const mapCenter = {
    lat: 39.910508,
    lng: 116.380122
}

const mapType = ref('行政')

const initMap = () => {
    map = markRaw(L.map('map', {
        minZoom: 3,
        maxZoom: 18,
        center: [mapCenter.lat, mapCenter.lng],
        zoom: 10,
        attributionControl: false,
        crs: L.CRS.EPSG4326, //设置坐标系4326
        zoomAnimation: true,
        zoomSnap: .5
    }))
    changeMapType(mapType.value)
}

//更换其他地图
const changeMapType = (name: string) => {
    if (!map) return
    mapType.value = name
    if (mapType.value == '行政') {
        document.querySelector('body')?.setAttribute('dark', 'true')
    } else {
        document.querySelector('body')?.setAttribute('dark', 'false')
    }

    if (rootlay) {
        map.removeLayer(rootlay)
    }
    if (name === '矢量') {
        const slLayer = esri.dynamicMapLayer({
            url: 这里写url,
            opacity: 1,
            useCors: false,
            zIndex: 10,
            attribution: "wn",
        });
        rootlay = L.layerGroup([slLayer]);
    } else if (name == '卫星') {
        const imgMapm = L.tileLayer(
            `http://t0.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${ak}`,
            {
                maxZoom: 13,
                minZoom: 3,
                zoomOffset: 1,
            }
        );
        const imgMapa = L.tileLayer(
            `http://t0.tianditu.gov.cn/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${ak}`,
            {
                maxZoom: 13,
                minZoom: 3,
                zoomOffset: 1,
            }
        );
        rootlay = L.layerGroup([imgMapm, imgMapa]);
    } else if (name == '行政') {
        const imgMapm = L.tileLayer(
            `http://t0.tianditu.gov.cn/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${ak}`,
            {
                maxZoom: 13,
                minZoom: 3,
                zoomOffset: 1,
            }
        );
        const imgMapa = L.tileLayer(
            `http://t0.tianditu.gov.cn/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${ak}`,
            {
                maxZoom: 13,
                minZoom: 3,
                zoomOffset: 1,
            }
        );

        rootlay = L.layerGroup([imgMapm, imgMapa]);
    }
    map.addLayer(rootlay);
}

//行政区划
const addGeoJson = () => {
    if (map) {
        let json = '这里写geojson的数据 , 如果不是用vite导入 请先读取数据'

        const wholeWorldBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

        type Position = number[];
        interface Polygon {
            type: 'Polygon',
            coordinates: Position[][]
        }

        interface MultiPolygon {
            type: 'MultiPolygon',
            coordinates: Position[][][]
        }

        const worldPolygon: Polygon = {
            type: 'Polygon',
            coordinates: [[
                [wholeWorldBounds.getWest(), wholeWorldBounds.getSouth()],
                [wholeWorldBounds.getWest(), wholeWorldBounds.getNorth()],
                [wholeWorldBounds.getEast(), wholeWorldBounds.getNorth()],
                [wholeWorldBounds.getEast(), wholeWorldBounds.getSouth()],
                [wholeWorldBounds.getWest(), wholeWorldBounds.getSouth()]
            ]]
        }

        const worldFeature = turf.feature(worldPolygon);

        let result = worldFeature;

        // 对 jsonFeature 中的每一个 Feature
        json.features.forEach((feature: any) => {
            // 如果 Feature 是 MultiPolygon 类型
            if (feature.geometry.type === 'MultiPolygon') {
                // 将 MultiPolygon 分解为多个 Polygon
                (feature.geometry as MultiPolygon).coordinates.forEach((polygonCoordinates: Position[][]) => {

                    const polygonGeometry: Polygon = {
                        type: 'Polygon',
                        coordinates: polygonCoordinates
                    };

                    // 计算差集
                    const polygonFeatureTurf = turf.feature(polygonGeometry);
                    const res = turf.difference(result, polygonFeatureTurf);
                    if (res) {
                        result = res as any
                    }

                });
            } else {
                // 如果 Feature 不是 MultiPolygon 类型，直接计算差集
                const featureTurf = turf.feature(feature.geometry);
                const res = turf.difference(result, featureTurf)
                if (res) {
                    result = res as any
                }
            }
        });

        const outsideLayer = L.geoJSON((result as any), {
            style: {
                fillColor: 'gray',
                fillOpacity: 0.5,
                stroke: false
            }
        }).addTo(markRaw(map));

        const geoLayer: any = markRaw(L.geoJSON(json as any))
        geoLayer.addTo(markRaw(map))
        geoLayer.setStyle({
            fillColor: '#052d7b',
            fillOpacity: 0
        })

        layers.value.push({
            key: '行政边界',
            layer: geoLayer
        })
        layers.value.push({
            key: '边界遮罩',
            layer: outsideLayer
        })
    }
}

//移除行政区划
const removeGeoJson = (type: string) => {
    if (map) {
        layers.value.map(t => {
            if (t.key == type) {
                t.layer.remove()
            }
        })
    }
}

//添加kml
const addKml = (url: string) => {
    if (map) {
        removePointOrImg('kml')

        fetch(url)
            .then(res => res.text())
            .then(kmltext => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(kmltext, 'text/xml');
                const geojson = kml(xmlDoc);

                const track = markRaw(L.geoJSON(geojson, {
                    style: function (feature) {
                        const strokeWidth = feature!.properties['stroke-width'] || 2;
                        const color = feature!.properties.fill || feature!.properties.stroke;

                        return { color: color, weight: strokeWidth, fillOpacity: 1 };
                    }
                }))
                layers.value.push({
                    key: 'kml',
                    layer: track
                })
                if (map) {
                    track.addTo(markRaw(map))
                }
            })
    }
}

//移除点图
const removePointOrImg = (key: string) => {
    const toRemove = layers.value.filter(t => t.key === key);
    toRemove.forEach(t => {
        if (map) {
            t.marks?.forEach(mark => {
                mark.closeTooltip(); // 关闭所有tooltip
            });
            t.layer.remove();
        }
    });
    layers.value = layers.value.filter(t => t.key !== key);
}

// '责任区', '警戒区', '监视区'
const drawWarningArea = (map: L.Map, _center: { lat: number, lng: number }, type: string) => {
    const types = ['责任区', '警戒区', '监视区']
    const radii = [10000, 20000, 30000];  // 半径，单位为米
    const colorList = ['#052d7b', '#00ddaa', '#94d6da']
    const center = [_center.lng, _center.lat]
    const mapCenter = {
        lat: center[1],
        lng: center[0]
    }
    const circle = markRaw(L.circle(mapCenter, radii[types.indexOf(type)]))
    circle.setStyle({
        fillColor: colorList[types.indexOf(type)] + '00',
        weight: 3,
        color: colorList[types.indexOf(type)],
    })
    circle.addTo(markRaw(map));
    layers.value.push({
        key: type,
        layer: circle
    })
}

//添加图
const addImgLayer = (imgUrl: string, imgBounds: number[][], key: string) => {
    removePointOrImg(key)
    if (map) {
        const imgLayer = markRaw(L.imageOverlay(imgUrl, imgBounds as any))
        imgLayer.addTo(map)
        imgLayer.setOpacity(.5)
        imgLayer.setZIndex(99)

        layers.value.push({
            key: key,
            layer: imgLayer
        })
    }
}

const addGrid = (data: { lat: number, lon: number, val: string }[]) => {
    if (map) {
        const bounds = map.getBounds() //获取可视区域 
        const marks: L.Marker[] = markRaw([])

        data.map(t => {
            if (bounds.contains([t.lat, t.lon])) {
                let isInside = false

                // 这里是geojson的边界数据, 如果不需要裁剪就可以不动要下面的内容 直接添加即可
                const point = turf.point([t.lon, t.lat])
                isInside = turf.booleanPointInPolygon(point, geoJson.features[0] as any)
                if (isInside) {
                    const icon = L.divIcon({
                        className: 'my-div-icon',
                        html: `<div >${t.val}</div>`
                    })
                    const mark = L.marker([t.lat, t.lon], { icon: icon })
                    marks.push(mark)
                }
            }
        })

        const layerGroup = markRaw(L.layerGroup()).addTo(map)

        marks.map(t => {
            layerGroup.addLayer(t)
        })

    }
}

const addIsolines = (data: { lat: number, lon: number, val: string }[], level: number[] = []) => {
    if (map) {
        const { points, breaks } = mkDataToTurfObj(data, level)
        const lines = turf.isolines(points, breaks, { zProperty: 'z' })
        const outsideLayer = L.geoJSON(lines, {
            style: {
                weight: 3,
                opacity: 1,
                color: 'red',
                fillColor: 'rgba(255,255,255,1)',
                fillOpacity: 0
            },
        }).addTo(markRaw(map));
    }
}

const addIsoBands = (data: { lat: number, lon: number, val: string }[], level: number[] = [], color: number[][] = []) => {
    if (map) {
        const { points, breaks } = mkDataToTurfObj(data, level)
        const bands = turf.isobands(points, breaks, { zProperty: 'z' })
        const outsideLayer = L.geoJSON(bands, {
            style: function (feature) {
                if (!feature) return {}
                const z = feature.properties.z
                const rgba = getIsoColor(z, level, color)
                return {
                    weight: 0,
                    fillColor: rgba,
                    fillOpacity: 0.5
                }
            }
        }).addTo(markRaw(map));
    }
}

const getBreaks = (data: { lat: number, lon: number, val: string }[], step = 1) => {
    let max = 0, min = 0
    data.map(t => {
        if (parseFloat(t.val) < min || min == null) {
            min = parseFloat(t.val)
        }
        if (parseFloat(t.val) > max || max == null) {
            max = parseFloat(t.val)
        }
    })
    const breaks: number[] = []
    for (let i = parseInt(min + '') - 1; i < parseInt(max + '') + 1; i += step) {
        breaks.push(i)
    }
    return breaks
}

const mkDataToTurfObj = (data: { lat: number, lon: number, val: string }[], breaks: number[] = []) => {
    const jsonPoints = data.map(t => [t.lon, t.lat])
    const points = turf.points(jsonPoints)
    points.features.map((t: any) => {
        t.properties = { z: parseFloat(data.find(j => j.lon == t.geometry.coordinates[0] && j.lat == t.geometry.coordinates[1])?.val || '0') }
    })

    if (breaks.length == 0) {
        breaks = getBreaks(data)
    }
    return { points, breaks }
}

const getIsoColor = (z: string, level: number[], color: number[][]) => {
    let rgb = 'rgba(255,255,255,0)'
    for (let i = 0; i < level.length; i++) {
        if (i < level.length - 1) {
            if (level[i] + '-' + level[i + 1] == z) {
                rgb = 'rgba(' + color[i][0] + ',' + color[i][1] + ',' + color[i][2] + ',1)'
            }
        }
    }
    return rgb
}


onMounted(async () => {
    initMap()
})


</script>