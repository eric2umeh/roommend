import { mockUsers, mockRoles } from './mock-data'
import type { User, Role } from './types'

// Simulated auth service (will be replaced with Supabase auth)
export const authUtils = {
  // Mock login - in production use Supabase Auth
  async login(
    email: string,
    password: string
  ): Promise<{ user: User; role: Role } | null> {
    // Find user by email
    const user = mockUsers.find((u) => u.email === email)
    if (!user) return null

    // In production, verify password with bcrypt
    // For demo, just check if email exists
    if (!user.is_active) return null

    // Get user role
    const role = mockRoles.find((r) => r.id === user.role_id)
    if (!role) return null

    // Update last login
    user.last_login = new Date().toISOString()

    return { user, role }
  },

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    return mockUsers.find((u) => u.id === userId) || null
  },

  // Get user's role
  async getUserRole(userId: string): Promise<Role | null> {
    const user = await this.getUserById(userId)
    if (!user) return null
    return mockRoles.find((r) => r.id === user.role_id) || null
  },

  // Check if user has permission
  async hasPermission(userId: string, permission: string): Promise<boolean> {
    const role = await this.getUserRole(userId)
    if (!role) return false
    return role.permissions.includes(permission)
  },

  // Check if user has any of the permissions
  async hasAnyPermission(
    userId: string,
    permissions: string[]
  ): Promise<boolean> {
    const role = await this.getUserRole(userId)
    if (!role) return false
    return permissions.some((p) => role.permissions.includes(p))
  },

  // Create a new user (admin only)
  async createUser(
    userData: Omit<User, 'id' | 'created_at' | 'updated_at' | 'last_login'>
  ): Promise<User | null> {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login: null,
    }
    // In production, save to database
    return newUser
  },

  // Update user
  async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User | null> {
    const user = mockUsers.find((u) => u.id === userId)
    if (!user) return null

    Object.assign(user, updates, {
      updated_at: new Date().toISOString(),
    })
    return user
  },

  // Get all users for organization
  async getOrganizationUsers(orgId: string): Promise<User[]> {
    return mockUsers.filter((u) => u.organization_id === orgId)
  },

  // Check subscription limits (free tier = 5 users)
  async checkUserLimit(orgId: string, maxUsers: number): Promise<boolean> {
    const users = await this.getOrganizationUsers(orgId)
    return users.length < maxUsers
  },
}

// Session management
export const sessionManager = {
  // Store session in memory (in production use secure cookies)
  sessions: new Map<string, { user: User; role: Role; expiresAt: Date }>(),

  createSession(user: User, role: Role): string {
    const sessionId = `session_${Date.now()}_${Math.random()}`
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    this.sessions.set(sessionId, { user, role, expiresAt })
    return sessionId
  },

  getSession(sessionId: string) {
    const session = this.sessions.get(sessionId)
    if (!session) return null
    if (new Date() > session.expiresAt) {
      this.sessions.delete(sessionId)
      return null
    }
    return session
  },

  destroySession(sessionId: string) {
    this.sessions.delete(sessionId)
  },

  isLoggedIn(sessionId: string): boolean {
    return this.getSession(sessionId) !== null
  },
}
