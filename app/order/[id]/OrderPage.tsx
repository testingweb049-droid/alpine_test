'use client'

import React, { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Plane,
  CreditCard,
  MapPin,
  ClipboardCopy,
  CheckCircle2,
  Navigation,
  Calendar,
  Users,
  Luggage,
  Baby,
  Briefcase,
  Star,
  Car,
  Globe,
} from 'lucide-react'
import axiosInstance from '@/lib/axios/axiosInstance'

// 🕒 Helpers
const formatDate = (date?: string | Date | null) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return String(date || '')
  }
}

const formatTime = (time?: string | null) => {
  if (!time) return ''
  try {
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const twelveHour = hours % 12 || 12
    return `${twelveHour}:${minutes.toString().padStart(2, '0')} ${period}`
  } catch {
    return String(time || '')
  }
}

interface OrderPageProps {
  reservationNumber: string
}

export default function OrderPage({ reservationNumber }: OrderPageProps) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!reservationNumber) return

    const fetchOrder = async () => {
      try {
        const result = await axiosInstance.post('/get-booking', { reservationNumber })
        if (result.data.success) {
          setOrder(result.data.booking)
        } else {
          setError(result.data.message || 'Booking not found.')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to load booking.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [reservationNumber])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 font-medium">
        Loading your booking...
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    )

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Booking data not available
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Booking Confirmed
            </h1>
            <p className="text-gray-600">Your ride is ready to go</p>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-600 mb-1">Booking ID</p>
              <p className="font-mono font-bold text-gray-900 truncate">
                {order.reservation_number || order.id}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(order.reservation_number || order.id)}
              className="p-2 hover:bg-white rounded-lg transition-all duration-200"
              title="Copy ID"
            >
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <ClipboardCopy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 lg:flex lg:gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <StatCard
              label="Total Price"
              value={`€${order.total_price || order.price || '0'}`}
              icon={<CreditCard className="w-5 h-5" />}
            />
            <StatCard
              label="Vehicle"
              value={order.selected_vehicle_name || order.car || 'N/A'}
              icon={<Car className="w-5 h-5" />}
            />
            {/* <StatCard
              label="Passengers"
              value={order.passengers || '0'}
              icon={<Users className="w-5 h-5" />}
            />
            <StatCard
              label="Luggage"
              value={order.luggage || order.bags || '0'}
              icon={<Luggage className="w-5 h-5" />}
            /> */}
          </div>

          {/* Journey Details */}
          <Section title="Journey Details" icon={<Navigation />}>
            <div className="space-y-4">
              <RouteStop
                type="pickup"
                location={order.pickup_location}
                date={order.date}
                time={order.time}
              />
              {order.dropoff_location && (
                <RouteStop
                  type="dropoff"
                  location={order.dropoff_location}
                />
              )}
            </div>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information" icon={<User />}>
            <div className="grid sm:grid-cols-2 gap-4">
              <DetailItem icon={<User />} label="Name" value={order.full_name || order.name} />
              <DetailItem icon={<Mail />} label="Email" value={order.email} />
              <DetailItem icon={<Phone />} label="Phone" value={order.phone_number || order.phone} />
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6 mt-8 lg:mt-0">
          {/* <div className="bg-gray-200 rounded-xl w-full h-48 flex items-center justify-center text-gray-500">
            Vehicle Image
          </div> */}

          <Section title="Payment & Status" icon={<CreditCard />}>
            <PaymentItem
              label="Payment Status"
              value={
                <span className={`capitalize font-semibold ${order.payment_status === 'success' ? 'text-green-600' :
                  order.payment_status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {order.payment_status || 'pending'}
                </span>
              }
            />
            <PaymentItem
              label="Booking Status"
              value={
                <span className={`capitalize font-semibold ${order.booking_confirmed ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.booking_confirmed ? 'confirmed' : 'pending'}
                </span>
              }
            />
            <PaymentItem label="Booking Date" value={formatDate(order.created_at || order.date)} />
            <PaymentItem label="Pickup Time" value={formatTime(order.time)} />
          </Section>

          {/* Passenger Details Card */}
          <Section title="Passenger Details" icon={<Users />}>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Passengers</span>
                <span className="font-medium text-gray-900">{order.passengers || '0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Luggage</span>
                <span className="font-medium text-gray-900">{order.luggage || order.bags || '0'}</span>
              </div>
              {order.language && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Preferred Language</span>
                  <span className="font-medium text-gray-900 capitalize">{order.language}</span>
                </div>
              )}
            </div>
          </Section>

          {(order.infant_seats > 0 || order.child_seats > 0 || order.booster_seats > 0) && (
            <Section title="Special Requirements" icon={<Star />}>
              {order.infant_seats > 0 && <div className="flex items-center gap-2 text-blue-700"><Baby className="w-4 h-4" />Infant Seats: {order.infant_seats}</div>}
              {order.child_seats > 0 && <div className="flex items-center gap-2 text-green-700"><Users className="w-4 h-4" />Child Seats: {order.child_seats}</div>}
              {order.booster_seats > 0 && <div className="flex items-center gap-2 text-purple-700"><Briefcase className="w-4 h-4" />Booster Seats: {order.booster_seats}</div>}
            </Section>
          )}
        </div>
      </main>
    </div>
  )
}

// --- Helper Components ---
const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
    {icon && <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center">{icon}</div>}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
)

const Section = ({ title, icon, children }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full lg:w-auto my-2">
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg text-white">{icon}</div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
)

type RouteStopType = 'pickup' | 'stop' | 'dropoff';

interface RouteStopProps {
  type: RouteStopType;
  location: string;
  date?: string;
  time?: string;
  number?: number;
}

const RouteStop = ({ type, location, date, time, number }: RouteStopProps) => {
  const config = {
    pickup: { color: 'bg-emerald-500', label: 'Pick-Up' },
    stop: { color: 'bg-blue-500', label: `Stop ${number}` },
    dropoff: { color: 'bg-red-500', label: 'Drop-Off' },
  }[type]

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center text-white`}><MapPin className="w-5 h-5" /></div>
        {type !== 'dropoff' && <div className="w-0.5 flex-1 bg-gray-300 mt-2"></div>}
      </div>
      <div className="flex-1 pb-6">
        <p className="font-semibold text-gray-900 mb-1">{config.label}</p>
        {date && time && <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(date)} at {formatTime(time)}</p>}
        <p className="text-sm text-gray-700 break-words">{location}</p>
      </div>
    </div>
  )
}

const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
    <div className="text-gray-400 w-5 h-5 flex-shrink-0 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 break-all">{value || 'N/A'}</p>
    </div>
  </div>
)

const PaymentItem = ({ label, value }: any) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
)