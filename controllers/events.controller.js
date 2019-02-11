import { Router } from 'express';
import storage from 'node-persist';

storage.init();

const router = Router();

router.get('/events', (_req, res) => {
    storage.getItem('events')
        .then((events = []) =>
            res.json(events)
        );
});

router.post('/event', (req, res) => {
    const { event } = req.body;

    storage.getItem('events')
        .then((events = []) => {
            events.push(event);
            storage.setItem('events', events);
        });
    res.sendStatus(200);
});

router.put('/event', (req, res) => {
    const { event } = req.body;
    storage.getItem('events')
        .then((events = []) => {
            events = events.map(e => e.id === event.id ? event : e);
            storage.setItem('events', events);
        });
    res.sendStatus(200);
});

router.delete('/event/:id', (req, res) => {
    const { id } = req.params;
    storage.getItem('events')
        .then((events = []) => {
            events = events.filter(e => e.id != id);
            storage.setItem('events', events);
        })
});

export default router;