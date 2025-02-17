
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const leads = await prisma.lead.findMany();
      res.status(200).json({ leads });
    } catch (error) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  } else if (req.method === 'POST') {
    const { name, email, phone, status, company, city, message } = req.body;
    try {
      const newLead = await prisma.lead.create({
        data: { name, email, phone, status, company, city, message },
      });
      res.status(201).json({ lead: newLead });
    } catch (error) {
      console.error('Error creating lead:', error);
      res.status(500).json({ error: 'Failed to create lead' });
    }
  } else if (req.method === 'PUT') {
    // Expecting the lead's id and updated fields in req.body
    const { id, name, email, phone, status, company, city, message } = req.body;
    try {
      const updatedLead = await prisma.lead.update({
        where: { id },
        data: { name, email, phone, status, company, city, message },
      });
      res.status(200).json({ lead: updatedLead });
    } catch (error) {
      console.error('Error updating lead:', error);
      res.status(500).json({ error: 'Failed to update lead' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
