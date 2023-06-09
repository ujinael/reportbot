import { UserService } from './../../../user/user.service';
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { doctorRequestButtons, doctorSceneButtons } from './doctor.buttons';
import { MedicalRequestService } from 'src/medical_request/medical_request.service';
import { ConfigService } from '@nestjs/config';
import { fromRequest } from 'src/bot/utils/templates';
@Scene('doctorScene')
export class TGDoctorScene {
  constructor(
    private readonly configService: ConfigService,
    private readonly medicalRequestService: MedicalRequestService,
    private readonly userService: UserService,
  ) {}
  @SceneEnter()
  async enter(@Ctx() ctx: SceneContext) {
    try {
      const currentUser = await this.userService.findOneTelegramId(ctx.from.id);
      if (!currentUser || !currentUser.employerId)
        await ctx.sendMessage('Ожидание подтверждения от админа');
      else {
        ctx.scene.state['employerId'] = currentUser.employerId;
        ctx.reply('Выберите действие', doctorSceneButtons());
      }
    } catch (er) {
      console.log(er);
    }
  }
  @Action('my_request_action')
  async onMyRequests(@Ctx() ctx: SceneContext) {
    try {
      ctx.reply('Выберите период', doctorRequestButtons());
    } catch (er) {
      console.log(er);
    }
  }
  @Action('schedule_today')
  async onScheduleToday(@Ctx() ctx: SceneContext) {
    try {
      const startDate = new Date();
      startDate.setUTCHours(1, 0, 0, 0);
      const endDate = new Date(startDate.getTime());
      endDate.setUTCHours(21, 0, 59, 0);
      const employer_id = ctx.scene.state['employerId'];
      const requests = await this.medicalRequestService.findByParams({
        startDate,
        endDate,
        employer_id,
      });

      ctx.sendMessage(
        `⌛️Расписание на ${startDate.toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}\n\n` + requests.map(fromRequest).join('\n'),
        {
          parse_mode: 'HTML',
        },
      );
    } catch (er) {
      console.log(er);
    }
  }
  @Action('schedule_tomorrow')
  async onScheduleTomorrow(@Ctx() ctx: SceneContext) {
    try {
      const startDate = new Date(Date.now() + 864e5);
      startDate.setUTCHours(1, 0, 0, 0);
      const endDate = new Date(startDate.getTime());
      endDate.setUTCHours(21, 0, 59, 0);
      const employer_id = ctx.scene.state['employerId'];

      const requests = await this.medicalRequestService.findByParams({
        startDate,
        endDate,
        employer_id,
      });
      ctx.sendMessage(
        `⌛️Расписание на ${startDate.toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}\n\n` + requests.map(fromRequest).join('\n'),
        {
          parse_mode: 'HTML',
        },
      );
    } catch (er) {
      console.log(er);
    }
  }

  @Action('patient_card_action')
  async onPatientCard(@Ctx() ctx: SceneContext) {
    try {
      await ctx.sendMessage('Card TODO');
    } catch (er) {
      console.log(er);
    }
  }
}
