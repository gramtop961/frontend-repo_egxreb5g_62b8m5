import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Search, Upload, CheckCircle } from 'lucide-react';

const sampleVenues = [
  { id: 1, name: 'Aurora Hall', capacity: 300, status: 'Available' },
  { id: 2, name: 'Nebula Lab', capacity: 60, status: 'Available' },
  { id: 3, name: 'Orion Auditorium', capacity: 800, status: 'Available' },
  { id: 4, name: 'Quasar Studio', capacity: 120, status: 'Available' },
  { id: 5, name: 'Zenith Conference Room', capacity: 40, status: 'Available' },
];

const StatusChip = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
      status === 'Available'
        ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-300/30'
        : 'bg-rose-400/15 text-rose-300 border border-rose-300/30'
    }`}
  >
    {status}
  </span>
);

const VenueCard = ({ venue, onRequest }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl"
  >
    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="flex items-start justify-between gap-3">
      <div>
        <h4 className="text-lg font-semibold text-white drop-shadow">{venue.name}</h4>
        <p className="text-sm text-white/60">Capacity: {venue.capacity}</p>
      </div>
      <StatusChip status={venue.status} />
    </div>
    <div className="mt-4 flex items-center justify-end gap-2">
      <button
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 transition-colors hover:bg-white/10"
      >
        View
      </button>
      <button
        onClick={() => onRequest(venue)}
        className="rounded-lg bg-cyan-400/90 px-3 py-1.5 text-sm font-medium text-slate-900 shadow-[0_8px_30px_rgba(6,182,212,0.35)] transition-all hover:bg-cyan-300 active:scale-[0.98]"
      >
        Request Booking
      </button>
    </div>
  </motion.div>
);

const BookingModal = ({ open, onClose, selected }) => {
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const simulateUpload = (file) => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return p + 6;
      });
    }, 80);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      // reset local state for next open
      setTimeout(() => {
        setDate(''); setStart(''); setEnd(''); setPurpose(''); setNotes(''); setProgress(0); setSubmitted(false); setUploading(false);
      }, 250);
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Request Booking</h3>
              <button onClick={onClose} className="text-white/70 hover:text-white">Close</button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-sm text-white/70">Venue</label>
                  <input value={selected?.name || ''} readOnly className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Date</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
                    <CalendarIcon size={16} className="text-white/60" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white/70">Start Time</label>
                  <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" required />
                </div>
                <div>
                  <label className="text-sm text-white/70">End Time</label>
                  <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" required />
                </div>
                <div>
                  <label className="text-sm text-white/70">Purpose</label>
                  <input value={purpose} onChange={(e) => setPurpose(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" placeholder="Seminar, Workshop, Club Meet..." required />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-white/70">Notes</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" rows={3} placeholder="Additional details" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-white/70">PDF Upload</label>
                  <div
                    className={`mt-1 flex h-28 w-full items-center justify-center gap-2 rounded-xl border border-dashed ${uploading ? 'border-cyan-300/60 bg-cyan-300/10' : 'border-white/20 bg-white/5'} text-white/80`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); simulateUpload(e.dataTransfer.files?.[0]); }}
                  >
                    <Upload size={18} />
                    <span className="text-sm">Drag & drop PDF here or <button type="button" className="underline" onClick={() => document.getElementById('fileInput')?.click()}>browse</button></span>
                    <input id="fileInput" type="file" accept="application/pdf" className="hidden" onChange={(e) => simulateUpload(e.target.files?.[0])} />
                  </div>
                  {uploading || progress > 0 ? (
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: 'easeOut', duration: 0.2 }}
                        className="h-full bg-cyan-400"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button type="button" onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10">Cancel</button>
                  <button type="submit" className="rounded-xl bg-cyan-400/90 px-4 py-2 font-medium text-slate-900 hover:bg-cyan-300">Submit Request</button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-emerald-300">
                  <CheckCircle size={64} />
                </motion.div>
                <p className="mt-3 text-white">Booking request submitted successfully.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VenueGrid = () => {
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return sampleVenues.filter((v) => v.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const onRequest = (venue) => {
    setSelected(venue);
    setModalOpen(true);
  };

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-semibold text-white">Venue Availability</h2>
        <div className="flex w-full max-w-sm items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white md:ml-auto">
          <Search size={16} className="text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search venues"
            className="w-full bg-transparent placeholder-white/40 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
          <VenueCard key={v.id} venue={v} onRequest={onRequest} />
        ))}
      </div>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} selected={selected} />
    </section>
  );
};

export default VenueGrid;
